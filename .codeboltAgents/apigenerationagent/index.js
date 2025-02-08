
const codebolt = require('@codebolt/codeboltjs').default;
const { generateOpenAPIStructure, setupUserMessage, getEnvironmentDetail, attemptLlmRequest, getToolDetail, getToolResult } = require('./helper')
const { SYSTEM_PROMPT_GENERATE_PROJECT} = require('./prompts')

let apiConversationHistory = [];
let toolResults = [];
let customInstructions;
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {

    let apiStructure = await generateOpenAPIStructure(req.message.userMessage);
    // console.log(apiStructure)

    let { projectPath } = await codebolt.project.getProjectPath();
        let tools = await codebolt.MCP.getAllMCPTools('codebolt');
        const message = `Please review the project at ${projectPath} and implement the API based on the provided OpenAPI structure:
        \`\`\`
        ${apiStructure}
        \`\`\`
        After implementation, attempt to run the server. If any errors occur, please address and resolve them.
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
            const response = await attemptLlmRequest(apiConversationHistory, tools, SYSTEM_PROMPT_GENERATE_PROJECT)
    
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
                            console.log("calling tool with parms",toolName, toolInput)
                            const [didUserReject, result] = await codebolt.MCP.executeTool(toolName, toolInput);
                            // console.log(didUserReject, result)
                            toolResults.push(getToolResult(toolUseId, result))
                            // console.log(toolResults)
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
                apiConversationHistory.push(nextUserMessage[0])
            }
    
        } catch (error) {
            console.log(error)
            break
        }
    }
    
    
    response("ok")
     
    })
    





