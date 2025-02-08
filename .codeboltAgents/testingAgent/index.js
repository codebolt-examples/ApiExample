const codebolt = require('@codebolt/codeboltjs').default;
const { setupUserMessage, getEnvironmentDetail, attemptLlmRequest, getToolDetail, getToolResult } = require('./helper')
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {

    let apiConversationHistory = [];
    let toolResults = [];
    let customInstructions;
    const PROMPT = `
    You are Codebolt, an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks, and best practices.
   
    Create a system that automates the process of running, testing, and resolving issues in a project. The system should follow these steps:

1. **Run the Project:**
   - Start the project in development or production mode. If it's a Node.js server, use the \`package.json\` scripts (e.g., \`npm start\`,\`npm run dev\`, \`node app.js\`). For other environments, use the appropriate command (e.g., \`python manage.py runserver\`).
   - Ensure the project runs without crashes or errors.
   - Test all routes and endpoints, whether they are GET, POST, PUT, or DELETE. Use curl with the execute command tool to test the routes.
   - Carefully analyze the API output. If a GET request does not return a 404 status, verify that the API endpoint is being called correctly.
   - Check if authorization is needed for any endpoints and include the necessary headers in the requests.

2 **Identify Issues:**
   - Analyze test results and logs to identify any failing tests or runtime errors.
   - Check for common issues such as:
     - Syntax errors.
     - Missing dependencies.
     - Incorrect environment configurations.
     - API failures or network issues.
     - Database connection errors.
   - Use linting tools (e.g., ESLint, Prettier, Pylint) to identify code style issues and potential bugs.

3. **Resolve Issues:**
   - Automatically fix common issues such as:
     - Formatting issues using tools like Prettier or Black.
     - Syntax errors by suggesting corrections.
     - Missing dependencies by installing them.
   - For complex issues, use provided tools.
   - If the issue cannot be resolved automatically, log it and provide a clear error message for manual intervention.

  ===== 
4.   For running shell commands.

        - When Using \`npx\`, ALWAYS provide the \`--yes\` flag.
        - When running multiple shell commands, use \`&&\` to run them sequentially.
  
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
    3. Ensure that the API handles errors gracefully and returns appropriate error messages and status codes.

    Important: Your task is to test every API, do not create test cases.

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
    
    1. **Endpoint Testing**: Test each API endpoint to ensure it returns the correct status code, headers, and response body. If any issues are found, resolve them.
    2. **Data Validation**: Verify that the data returned by the API matches the expected format and content. If discrepancies are found, resolve them.
    3. **Error Handling**: Ensure that the API handles errors gracefully and returns appropriate error messages and status codes. If any issues are found, resolve them.
    4. **Performance Testing**: Conduct load testing to determine how the API performs under various levels of traffic. If performance issues are found, resolve them.
    5. **Security Testing**: Identify and report any security vulnerabilities in the API. If any vulnerabilities are found, resolve them.
    6. **Documentation Review**: Compare the API responses with the provided documentation to ensure consistency. If inconsistencies are found, resolve them.
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


