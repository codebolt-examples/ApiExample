const codebolt = require('@codebolt/codeboltjs').default;
const { setupUserMessage, getEnvironmentDetail, attemptLlmRequest, getToolDetail, getToolResult } = require('./helper')
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {

    let apiConversationHistory = [];
    let toolResults = [];
    let customInstructions;
    const PROMPT = `
    You are an AI agent specialized in testing APIs. Your primary responsibility is to ensure that the API endpoints are functioning correctly, efficiently, and securely. You have access to a variety of tools to assist you in this task, 
  ===== 
OBJECTIVE

You accomplish a given task iteratively, breaking it down into clear steps and working through them methodically.

1. Remember, you have extensive capabilities with access to a wide range of tools that can be used in powerful and clever ways as necessary to accomplish each goal. 
2. Before calling a tool, Analyze the file structure provided in environment_details to gain context and insights for proceeding effectively. 
3. Carefully evaluate which tool is most relevant to accomplish the user's task. 
4. For each tool, ensure **all required parameters** are either directly provided by the user or can be inferred from the context. If a required parameter is missing and cannot be inferred, DO NOT invoke the tool. Instead, ask the user for the missing information using the ask_followup_question tool. Ensure your analysis inside the <thinking></thinking> tags explicitly states why a parameter is missing if applicable.
5. If optional parameters are missing, you can proceed without them.
6. If all required parameters are present, close the <thinking></thinking> tag and proceed with the tool call.

====
    Your tasks include:
    
    1. Test each API endpoint to ensure it returns the correct status code, headers, and response body.
    2. Verify that the data returned by the API matches the expected format and content.
    3.  Ensure that the API handles errors gracefully and returns appropriate error messages and status codes.

    You should generate a detailed report after each testing cycle, including:
    - A summary of the tests conducted.
    - Any issues or bugs discovered.
    - Recommendations for improvements.
    `;

    console.log(PROMPT);
    if (req.message?.mentionedFiles?.length) {
        let { result } = await codebolt.fs.readFile(req.message.mentionedFiles[0]);
        customInstructions = result;
    }
    let { projectPath } = await codebolt.project.getProjectPath();
    let tools = await codebolt.MCP.getAllMCPTools('codebolt');

    const message = req.message.userMessage + `\n  Your tasks include:
    
    1. **Endpoint Testing**: Test each API endpoint to ensure it returns the correct status code, headers, and response body.
    2. **Data Validation**: Verify that the data returned by the API matches the expected format and content.
    3. **Error Handling**: Ensure that the API handles errors gracefully and returns appropriate error messages and status codes.
    4. **Performance Testing**: Conduct load testing to determine how the API performs under various levels of traffic.
    5. **Security Testing**: Identify and report any security vulnerabilities in the API.
    6. **Documentation Review**: Compare the API responses with the provided documentation to ensure consistency.
    `;

    let userMessage = setupUserMessage(message);
    const environmentDetail = await getEnvironmentDetail(projectPath)

    let mentionedMCPs = req.message.mentionedMCPs || []
    let nextUserMessage = userMessage;
    nextUserMessage.push({ type: "text", text: environmentDetail })
    apiConversationHistory.push({ role: "user", content: nextUserMessage })


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


