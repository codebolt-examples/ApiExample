const codebolt = require('@codebolt/codeboltjs').default;



const   setupUserMessage=(message)=> {
    return [
        {
            type: "text",
            text: `<task>\n${message}\n</task>`,
        }
    ];
}
 const getToolDetail = (tool) => {
    return {
        toolName: tool.function.name,
        toolInput: JSON.parse(tool.function.arguments || "{}"),
        toolUseId: tool.id
    };
}
const getToolResult = (tool_call_id, content) => {
    let toolResult = {
        role: "tool",
        tool_call_id,
        content,
    }
    return toolResult

}



 const  attemptLlmRequest= async (apiConversationHistory,tools, systemPrompt)=> {
    try {
        const aiMessages = [
            { role: "system", content: systemPrompt },
            ...apiConversationHistory,
        ]
        const createParams = {
            full: true,
            messages: aiMessages,
            tools: tools,
            tool_choice: "auto",
        };
        // console.log(JSON.stringify(aiMessages))
      
        let { completion } = await codebolt.llm.inference(createParams);
        return completion
        // return {message}
    } catch (error) {
        console.log(error)
       
        return this.attemptApiRequest()
    }
}
const  getEnvironmentDetail= async (cwd) =>{
    let details = ""
    //@ts-ignore
    let { success, result } = await codebolt.fs.listFile(cwd, true)
    details += `\n\n# Current Working Directory (${cwd}) Files\n${result}
        ? "\n(Note: Only top-level contents shown for Desktop by default. Use list_files to explore further if necessary.)"
        : ""
        }`
    return `<environment_details>\n${details.trim()}\n</environment_details>`
}

module.exports = {
    

    attemptLlmRequest,
    setupUserMessage,
    getEnvironmentDetail,
    getToolDetail,
    getToolResult
}







