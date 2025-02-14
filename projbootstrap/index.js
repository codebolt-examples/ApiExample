const { UserMessage } = require('./lib/usermessage');
const { SystemPrompt } = require('./lib/systemprompt');
const { TaskInstruction } = require('./lib/taskInstruction');
const { Agent } = require('./lib/agent');
const codebolt = require('@codebolt/codeboltjs').default;

codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {
    try {
        const userMessage = new UserMessage(req.message);
        const systemPrompt = new SystemPrompt("./agent.yaml", "proxyagent");
        const agentTools = await codebolt.MCP.getAllMCPTools("codebolt");
        const task = new TaskInstruction(agentTools, userMessage, "./task.yaml", "research_task");
        const agent = new Agent(agentTools, systemPrompt);
        const { success, error } = await agent.run(task);
        response(success ? success : error);
    } catch (error) { response(error)}

});