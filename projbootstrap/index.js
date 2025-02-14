const { UserMessage } = require('./lib/usermessage');
const { SystemPrompt } = require('./lib/systemprompt');
const { TaskInstruction } = require('./lib/taskInstruction');
const { Agent } = require('./lib/agent');
const codebolt = require('@codebolt/codeboltjs').default;

codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {

    try {
        // Configuration constants
        const AGENT_CONFIG = "./agent.yaml";
        const AGENT_NAME = "proxyagent";
        const TASK_CONFIG = "./task.yaml";
        const TASK_NAME = "research_task";
        const MCP_SOURCE = 'codebolt';

        // Validate connection
        await codebolt.waitForConnection();

        // Validate and process request
        if (!req?.message) {
            throw new Error("Invalid request: missing message");
        }

        // Initialize components
        const userMessage = new UserMessage(req.message);
        const systemPrompt = new SystemPrompt(AGENT_CONFIG, AGENT_NAME);
        const agentTools = await codebolt.MCP.getAllMCPTools(MCP_SOURCE);

        // Process user message
        const userMessages = await userMessage.toPrompt(true, true, true);

        // Create task and agent
        const task = new TaskInstruction(agentTools, userMessages, TASK_CONFIG, TASK_NAME);
        console.log("Task created:", task.toPrompt());

        //
        const agent = new Agent(agentTools);

        // Execute agent task
        const { success, error } = await agent.run(
            systemPrompt.toPromptText(),
            task.toPrompt()
        );

        // Handle response
        if (success) {
            console.log("Task executed successfully");
            // response("ok");
        } else {
            console.error("Task execution failed:", error);
            response("error", { error });
        }
    } catch (error) {
        console.error("Error in main execution:", error);
        // response("error", { error: error.message });
    }

});