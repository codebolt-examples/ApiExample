
const codebolt = require('@codebolt/codeboltjs').default;

const { UserMessage, SystemPrompt, TaskInstruction, Agent } = require("@codebolt/codeboltjs/utils");

codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {
    try {
        const userMessage = new UserMessage(req.message);
        const systemPrompt = new SystemPrompt("./agent.yaml", "main");
        const agentTools = await codebolt.MCP.getAllMCPTools("codebolt");
        let {agents}= await codebolt.AGENT.getAgentsList('local')
        const task = new TaskInstruction(agentTools, userMessage, "./task.yaml", "research_task");
        const agent = new Agent(agentTools, systemPrompt,1,agents);
        // console.log(agent.subAgents)
        const { success, error } = await agent.run(task);
        response(success ? success : error);
        response("ok")
    } catch (error) {
        console.log(error)
    }
})
