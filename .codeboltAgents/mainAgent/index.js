const codebolt = require('@codebolt/codeboltjs').default;
codebolt.chat.onActionMessage().on("userMessage", async (req, response) => {
    let customInstructions;
    if (req.message?.mentionedFiles?.length) {
        let { result } = await codebolt.fs.readFile(req.message.mentionedFiles[0]);
        customInstructions = result;
    }
    let { projectPath } = await codebolt.project.getProjectPath();
    console.log(projectPath)
    let { projectState } = await codebolt.cbstate.getProjectState();
    console.log(projectState)

    let message = `Task execution initiated: \`${req.message.userMessage}\`
    Target file: \`${req.message.mentionedFiles[0]}\`.
    Please confirm project setup at: \`${projectPath}\`. The current file configuration is as follows:

\`\`\`
${customInstructions}
\`\`\``;

    if (!!projectState.projectCreated) {
        await codebolt.AGENT.startAgent('apiAgent', message);
        await codebolt.AGENT.startAgent('testingAgent', message);
        response("ok")
    }
    else {
        let { result } = await codebolt.AGENT.startAgent('projectBootstrap', message);
        codebolt.chat.sendMessage("projectBootstrap finished it task now calling api agent")
        await codebolt.AGENT.startAgent('apiAgent', message);
        await codebolt.cbstate.updateProjectState("projectCreated", true);
        await codebolt.AGENT.startAgent('testingAgent', message);
        response("ok")
    }



})


