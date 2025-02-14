const codebolt = require('@codebolt/codeboltjs').default;
class UserMessage {
    constructor(message, promptOverride = false) {
        this.message = message;
        this.promptOverride = promptOverride;
        this.userMessages = [];
    }
    getFiles() {

    }
    async toPrompt(bAttachFiles = true, bAttachImages = true, bAttachEnvironment = true) {
        if (bAttachFiles) {
            if (this.promptOverride != "") {
                //Use a rendering engine
            }
            else {
                let finalPrompt = `
                    The user has sent the following query:
                    ${this.message.userMessage}.
                `
                if (this.message.mentionedFiles?.length) {
                    finalPrompt += `The Attached files are:`
                    for (const file of this.message.mentionedFiles) {
                        let filedata = await codebolt.fs.readFile(file);
                        finalPrompt += `File Name: ${file}, File Path: ${file}, Filedata: ${filedata}`
                    }
                }
                this.userMessages.push({ type: "text", text: finalPrompt })

            }

        }
        if (bAttachEnvironment) {
            let { projectPath } = await codebolt.project.getProjectPath();
            const environmentDetail = await this.getEnvironmentDetail(projectPath)
            this.userMessages.push({ type: "text", text: environmentDetail })




        }

        return this.userMessages;
        // Check for image
        // Add Environment Details

    }
    getMentionedMcps() {
        let mentionedMCPs = req.message.mentionedMCPs || []
        return mentionedMCPs;
    }
    getEnvironmentDetail = async (cwd) => {
        let details = ""
        //@ts-ignore
        let { success, result } = await codebolt.fs.listFile(cwd, true)
        details += `\n\n# Current Working Directory (${cwd}) Files\n${result}
            ? "\n(Note: Only top-level contents shown for Desktop by default. Use list_files to explore further if necessary.)"
            : ""
            }`
        return `<environment_details>\n${details.trim()}\n</environment_details>`
    }
}

module.exports = {
    UserMessage
}