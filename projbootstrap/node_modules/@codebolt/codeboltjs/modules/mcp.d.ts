declare const codeboltMCP: {
    executeTool: (toolName: string, params: any, mcpServer?: string) => Promise<any>;
    getMcpTools: (tools: string[]) => Promise<any>;
    getAllMCPTools: (mpcName: string) => Promise<any>;
    getMCPTool: (name: string) => Promise<any>;
    getEnabledMCPS: () => Promise<any>;
};
export default codeboltMCP;
