const codebolt = require('@codebolt/codeboltjs').default;
const { setupUserMessage, getEnvironmentDetail, attemptLlmRequest, getToolDetail, getToolResult } = require('./helper')
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {

    let apiConversationHistory = [];
    let toolResults = [];
    let customInstructions;
    let PROMPT = `As a distinguished AI developer with deep expertise in API design, development, and integration, you possess comprehensive knowledge of all major frameworks, including Cloudflare Workers, Express, Google Cloud Functions, AWS Lambda, Azure Functions, and more. Your mission is to architect a robust, scalable, and meticulously documented API skeleton tailored precisely to the user's unique requirements, without implementing the full logic.
====
OBJECTIVE

You accomplish a given task iteratively, breaking it down into clear steps and working through them methodically.

1. Remember, you have extensive capabilities with access to a wide range of tools that can be used in powerful and clever ways as necessary to accomplish each goal. 
2. Before calling a tool, analyze the file structure provided in environment_details to gain context and insights for proceeding effectively. 
3. Carefully evaluate which tool is most relevant to accomplish the user's task. 
4. For each tool, ensure **all required parameters** are either directly provided by the user or can be inferred from the context. If a required parameter is missing and cannot be inferred, DO NOT invoke the tool. Instead, ask the user for the missing information using the ask_followup_question tool. Ensure your analysis inside the <thinking></thinking> tags explicitly states why a parameter is missing if applicable.
5. If optional parameters are missing, you can proceed without them.
6. If all required parameters are present, close the <thinking></thinking> tag and proceed with the tool call.

CLOUD PROVIDER SETUP:
- If deploying on **Cloudflare Workers**, ensure configuration includes \`wrangler.toml\`, KV storage setup (if needed), and durable objects if required.
- If using **Google Cloud Functions**, configure \`gcloud\` settings, \`functions-framework\`, IAM permissions, and ensure \`serverless.yaml\` or \`gcloud CLI\` setup is complete.
- If deploying to **AWS Lambda**, set up \`serverless.yml\`, required IAM roles, API Gateway configurations, and include relevant \`package.json\` dependencies.
- If using **Azure Functions**, ensure \`host.json\`, \`local.settings.json\`, and \`function.json\` files are set up along with the required runtime settings.

IMPORTANT: If the project is already set up, **do nothing** and call \`attempt_completion\`.
IMPORTANT: If a tool call fails or an error occurs, revisit your analysis to check for any oversight and attempt an alternative approach if necessary.
IMPORTANT: While generating structure for the project, check user instructions carefully and add all required configurations for the chosen framework. Do not implement full functionality; your task is to generate the basic structure.
IMPORTANT: Ensure the project structure adheres to the best industry standards.
IMPORTANT: Used Below Format for Wrangler if using Cloudflare Workers:
\`\`\`
name = "codeboltproxy"
compatibility_date = "2024-05-13"
main = "src/index.ts"
compatibility_flags = [ "nodejs_compat" ]
\`\`\`

package.json start script:
\`\`\`
  "scripts": {
    "dev": "wrangler dev  src/index.ts",
    }
\`\`\`

IMPORTANT: Always add default get route:
Example
\`\`\`
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
  \`\`\`
`

    if (req.message?.mentionedFiles?.length) {
        let { result } = await codebolt.fs.readFile(req.message.mentionedFiles[0]);
        customInstructions = result;
    }
    let { projectPath } = await codebolt.project.getProjectPath();
    let tools = await codebolt.MCP.getAllMCPTools('codebolt');

    const message = req.message.userMessage;

    let userMessage = setupUserMessage(message);
    const environmentDetail = await getEnvironmentDetail(projectPath)

    let mentionedMCPs = req.message.mentionedMCPs || []
    let nextUserMessage = userMessage;
    nextUserMessage.push({ type: "text", text: environmentDetail })
    apiConversationHistory.push({ role: "user", content: nextUserMessage })
    apiConversationHistory.push({
        role: "user",
        content: "Read user instructions carefully. Setup project if not already set up. If the project is already set up, do nothing and call taskCompletion."
    });

    let isStructureCreated = false
    while (!isStructureCreated) {
        try {
            const response = await attemptLlmRequest(apiConversationHistory, tools, PROMPT)

            let isMessagePresentinReply = false;
            for (const contentBlock of response.choices) {
                if (contentBlock.message) {
                    isMessagePresentinReply = true;
                    apiConversationHistory.push(contentBlock.message)
                    if (contentBlock.message.content != null)
                        await codebolt.chat.sendMessage(contentBlock.message.content, {})

                }
            }
            if (!isMessagePresentinReply) {
                apiConversationHistory.push({
                    role: "assistant",
                    content: [{ type: "text", text: "Failure: I did not provide a response." }],
                })
            }
            toolResults = []
            let taskCompletedBlock;
            let userRejectedToolUse = false;
            const contentBlock = response.choices[0]
            if (contentBlock.message && contentBlock.message.tool_calls) {
                for (const tool of contentBlock.message.tool_calls) {
                    const { toolInput, toolName, toolUseId } = getToolDetail(tool);
                    if (!userRejectedToolUse) {
                        if (toolName.includes("attempt_completion")) {
                            taskCompletedBlock = tool
                        } else {
                            console.log("calling tool with parms", toolName, toolInput)
                            const [didUserReject, result] = await codebolt.MCP.executeTool(toolName, toolInput);
                            console.log(didUserReject, result)
                            toolResults.push(getToolResult(toolUseId, result))
                            console.log(toolResults)
                            if (didUserReject) {
                                userRejectedToolUse = true
                            }
                        }
                    }
                    else {
                        toolResults.push(getToolResult(toolUseId, "Skipping tool execution due to previous tool user rejection."))
                    }
                }
            }
            if (taskCompletedBlock) {
                let [_, result] = await codebolt.MCP.executeTool(
                    taskCompletedBlock.function.name,
                    JSON.parse(taskCompletedBlock.function.arguments || "{}")
                )
                if (result === "") {
                    isStructureCreated = true
                    result = "The user is satisfied with the result."
                }
                toolResults.push(getToolResult(taskCompletedBlock.id, result))
            }
            for (let result of toolResults) {
                apiConversationHistory.push(result)
            }
            nextUserMessage = toolResults
            if (toolResults.length == 0) {
                nextUserMessage = [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": "If you have completed the user's task, use the attempt_completion tool. If you require additional information from the user, use the ask_followup_question tool. Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task. (This is an automated message, so do not respond to it conversationally.)"
                            }
                        ]
                    }
                ]
                if (nextUserMessage)
                    apiConversationHistory.push(nextUserMessage[0])
            }

        } catch (error) {
            console.log(error)
            break
        }
    }


    response("ok")



})


