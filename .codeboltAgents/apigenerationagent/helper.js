const codebolt = require('@codebolt/codeboltjs').default;

const generateOpenAPIStructure = async (userMessage, customInstructions) => {
    try {
        let messageForLLm = {
            messages: [{
                "role": "system",
                "content": ``
            }, {
                "role": "user",
                "content": `The following is the user's query: ${userMessage}
Please construct the Swagger OpenAPI format structure based on the provided YAML format.

The instructions for api docs are available in the following YAML format
Response only in yml format do not give any explination

response format must be in below format 

~~~
<api docs yaml>
~~~

`}],
            tool_choice: "auto",
        }
        const { completion } = await codebolt.llm.inference(messageForLLm);
        codebolt.chat.sendMessage("API structure Generated For your Query")
        // codebolt.chat.sendMessage(completion.choices[0].message.content);

        return completion.choices[0].message.content
    }
    catch (e) {
        throw e
    }
}

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
        // console.log(aiMessages)
      
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
    generateOpenAPIStructure,

    attemptLlmRequest,
    setupUserMessage,
    getEnvironmentDetail,
    getToolDetail,
    getToolResult
}







