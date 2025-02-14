const codebolt = require('@codebolt/codeboltjs').default;

/**
 * Basic working of Agent is that it will send the task to LLM and then inside while loop, it will keep on calling llm, 
 * untill the llm says that it has done the task.
 * Here we are only working on tools, and nothing else.
 */
class Agent {
    constructor(tools = {}, maxRun = 0) {
        this.tools = tools;
        this.apiConversationHistory = []
        this.maxRun = maxRun;
    }

    async run(systemprompt, userMessages = [], successCondition = () => true) {
        let completed = false;
        this.apiConversationHistory.push({ role: "user", content: userMessages });
        let runcomplete = 0
        while (!completed && (runcomplete <= this.maxRun || this.maxRun == 0)) {
            try {
                runcomplete++;
                const response = await this.attemptLlmRequest(this.apiConversationHistory, this.tools, systemprompt);
                let isMessagePresentinReply = false;
                for (const contentBlock of response.choices) {
                    if (contentBlock.message) {
                        isMessagePresentinReply = true;
                        this.apiConversationHistory.push(contentBlock.message);
                        if (contentBlock.message.content != null) {
                            await codebolt.chat.sendMessage(contentBlock.message.content);
                        }
                    }
                }
                if (!isMessagePresentinReply) {
                    this.apiConversationHistory.push({
                        role: "assistant",
                        content: [{ type: "text", text: "Failure: I did not provide a response." }],
                    });
                }
                try {
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
                            completed = true;
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
                    return { success: false, error: error.message || error };

                }
            } catch (error) {
                return { success: false, error: error.message || error };
            }
        }
        return { success: completed, error: null };
    }

    async attemptLlmRequest(apiConversationHistory, tools, systemPrompt) {
        try {
            const aiMessages = [
                { role: "system", content: systemPrompt },
                ...apiConversationHistory,
            ]
            const createParams = {
                full: true,
                messages: aiMessages,
                tools: tools,
                tool_choice: "auto",
            };
            // console.log(JSON.stringify(aiMessages))

            let { completion } = await codebolt.llm.inference(createParams);
            return completion
            // return {message}
        } catch (error) {
            console.log(error)

            return this.attemptApiRequest()
        }
    }

    async sendMessage(content) {
        codebolt.chat.sendMessage(content)
    }

    addToConversationHistory() {

    }



    async executeTool(toolName, toolInput) {
        // Placeholder for the actual implementation
        return await codebolt.MCP.executeTool(toolName, toolInput);
    }
    getToolDetail = (tool) => {
        return {
            toolName: tool.function.name,
            toolInput: JSON.parse(tool.function.arguments || "{}"),
            toolUseId: tool.id
        };
    }
    getToolResult = (tool_call_id, content) => {
        let toolResult = {
            role: "tool",
            tool_call_id,
            content,
        }
        return toolResult

    }
}

module.exports = { Agent };