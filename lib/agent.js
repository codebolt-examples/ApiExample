class Agent {
    constructor(tools = {}) {
        this.tools = tools;
        this.apiConversationHistory = []
    }

    async run(prompt) {
        let isStructureCreated = false;
        while (!isStructureCreated) {
            try {
                const response = await this.attemptLlmRequest(this.apiConversationHistory, this.tools, prompt);

                let isMessagePresentinReply = false;
                for (const contentBlock of response.choices) {
                    if (contentBlock.message) {
                        isMessagePresentinReply = true;
                        this.apiConversationHistory.push(contentBlock.message);
                        if (contentBlock.message.content != null) {
                            await this.sendMessage(contentBlock.message.content);
                        }
                    }
                }
                if (!isMessagePresentinReply) {
                    this.apiConversationHistory.push({
                        role: "assistant",
                        content: [{ type: "text", text: "Failure: I did not provide a response." }],
                    });
                }
                let toolResults = [];
                let taskCompletedBlock;
                let userRejectedToolUse = false;
                const contentBlock = response.choices[0];
                if (contentBlock.message && contentBlock.message.tool_calls) {
                    for (const tool of contentBlock.message.tool_calls) {
                        const { toolInput, toolName, toolUseId } = this.getToolDetail(tool);
                        if (!userRejectedToolUse) {
                            if (toolName.includes("attempt_completion")) {
                                taskCompletedBlock = tool;
                            } else {
                                console.log("calling tool with parms", toolName, toolInput);
                                const [didUserReject, result] = await this.executeTool(toolName, toolInput);
                                toolResults.push(this.getToolResult(toolUseId, result));
                                if (didUserReject) {
                                    userRejectedToolUse = true;
                                }
                            }
                        } else {
                            toolResults.push(this.getToolResult(toolUseId, "Skipping tool execution due to previous tool user rejection."));
                        }
                    }
                }
                if (taskCompletedBlock) {
                    let [_, result] = await this.executeTool(
                        taskCompletedBlock.function.name,
                        JSON.parse(taskCompletedBlock.function.arguments || "{}")
                    );
                    if (result === "") {
                        isStructureCreated = true;
                        result = "The user is satisfied with the result.";
                    }
                    toolResults.push(this.getToolResult(taskCompletedBlock.id, result));
                }
                for (let result of toolResults) {
                    this.apiConversationHistory.push(result);
                }
                let nextUserMessage = toolResults;
                if (toolResults.length == 0) {
                    nextUserMessage = [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "If you have completed the user's task, use the attempt_completion tool. If you require additional information from the user, use the ask_followup_question tool. Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task. (This is an automated message, so do not respond to it conversationally.)"
                                }
                            ]
                        }
                    ];
                    if (nextUserMessage) {
                        this.apiConversationHistory.push(nextUserMessage[0]);
                    }
                }
            } catch (error) {
                console.log(error);
                break;
            }
        }
    }

    async attemptLlmRequest(apiConversationHistory, tools, prompt) {
        // Placeholder for the actual implementation
    }

    async sendMessage(content) {
        // Placeholder for the actual implementation
    }

    getToolDetail(tool) {
        // Placeholder for the actual implementation
    }

    async executeTool(toolName, toolInput) {
        // Placeholder for the actual implementation
    }

    getToolResult(toolUseId, result) {
        // Placeholder for the actual implementation
    }
}