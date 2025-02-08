const codebolt = require('@codebolt/codeboltjs').default;
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {
    let customInstructions;

 
    if (req.message?.mentionedFiles?.length) {
        let { result } = await codebolt.fs.readFile(req.message. mentionedFiles[0]);
        customInstructions = result;
    }
    let { projectPath } = await codebolt.project.getProjectPath();
    let { projectState } = await codebolt.cbstate.getProjectState();

    let message = `Task execution initiated: \`${req.message.userMessage}\`
    Please confirm project setup at: \`${projectPath}\`. The current file configuration is as follows:

\`\`\`
${customInstructions}
\`\`\``;

    if (!!projectState.projectCreated) {
        codebolt.chat.sendMessage("Starting Api agent");
        await codebolt.AGENT.startAgent('apiAgent', message);
        codebolt.chat.sendMessage("Starting Testing Agent");
        await codebolt.AGENT.startAgent('testingAgent', message);
        response("ok")
    }
    else {
        codebolt.chat.sendMessage("Starting Project Bootstrap agent");
        let { result } = await codebolt.AGENT.startAgent('projectBootstrap', message);
        codebolt.chat.sendMessage("projectBootstrap finished it task now calling api agent")
        await codebolt.AGENT.startAgent('apiAgent', message);
        await codebolt.cbstate.updateProjectState("projectCreated", true);
        codebolt.chat.sendMessage("Starting Testing Agent");
        await codebolt.AGENT.startAgent('testingAgent', message);
        response("ok")
    }




})


