const codebolt = require('@codebolt/codeboltjs').default;
const { setupUserMessage, getEnvironmentDetail } = require('./helper');
const Agent = require('./agent');
const fs = require('fs');
const path = require('path');

codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {
    let customInstructions;
    let PROMPT;

    try {
        const agentYamlPath = path.resolve(__dirname, 'agent.yaml');
        const agentYamlContent = fs.readFileSync(agentYamlPath, 'utf8');
        const match = agentYamlContent.match(/PROMPT: \|([\s\S]*?)\n\n/);
        if (match) {
            PROMPT = match[1].trim();
        } else {
            throw new Error("PROMPT not found in agent.yaml");
        }
    } catch (error) {
        console.error("Error reading PROMPT from agent.yaml:", error);
        return response("error");
    }

    if (req?.message?.mentionedFiles?.length) {
        let { result } = await codebolt.fs.readFile(req?.message?.mentionedFiles[0]);
        customInstructions = result;
    }
    let { projectPath } = await codebolt.project.getProjectPath();
    let tools = await codebolt.MCP.getAllMCPTools('codebolt');

    const message = req.message.userMessage;

    let userMessage = setupUserMessage(message);
    const environmentDetail = await getEnvironmentDetail(projectPath);

    let mentionedMCPs = req.message.mentionedMCPs || [];
    let nextUserMessage = userMessage;
    nextUserMessage.push({ type: "text", text: environmentDetail });
    let apiConversationHistory = [{ role: "user", content: nextUserMessage }];
    apiConversationHistory.push({
        role: "user",
        content: "Read user instructions carefully. Setup project if not already set up. If the project is already set up, do nothing and call taskCompletion."
    });

    const agent = new Agent(tools);
    agent.apiConversationHistory = apiConversationHistory;

    try {
        await agent.run(PROMPT);
    } catch (error) {
        console.log(error);
    }

    response("ok");
});
