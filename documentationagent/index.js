const codebolt = require('@codebolt/codeboltjs').default;
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {
    let userMessage = new UserMessage(req.message);
    //function to get all the functions in the code and loop through the code.
    
    let systemprompt = new SystemPrompt("./agent.yaml", "proxyagent")
    let agenttools = await codebolt.MCP.getAllMCPTools('codebolt');
    let agent = new Agent(systemprompt)
    let task = new TaskInstruction(agenttools, userMessage, "./task.yaml", "research_task")
    let {success, error} = await agent.execute(task);
    if(success){
        return("ok");
    }
});