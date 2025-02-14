class UserMessage{
    constructor(message, promptOverride=""){
        this.message = message;
    }
    getFiles(){

    }
    async toPrompt(){
        if(promptOverride!=""){
            //Use a rendering engine
        }
        else{
            var finalPrompt = `
                The user has sent the following query:
                ${this.message.userMessage}.
            `
            if(length(this.message.attachedFiles)>0)
            {  
                finalPrompt += `The Attached files are:`
                for (const file of this.message.attachedFiles) {
                    let filedata = await codebolt.fs.getFile(file);
                    finalPrompt += `File Name: ${file}, File Path: ${file}, Filedata: ${filedata}`
                }
            }
            // Check for image
            // Add Environment Details
        }
    }
}