import cbws from './websocket';
const codeboltMCP = {

    executeTool: ( toolName: string, params: any,mcpServer?: string,): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "executeTool",
                "toolName": toolName,
                "params": params
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "executeToolResponse") {
                        resolve(response.data);
                    } 
                } catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            cbws.getWebsocket.on('error', (error: Error) => {
                reject(error);
            });
        });
    },
    getMcpTools: (tools: string[]): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getMcpTools",
                "tools": tools
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getMcpToolsResponse") {
                        resolve(response.data);
                    } 
                } catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            cbws.getWebsocket.on('error', (error: Error) => {
                reject(error);
            });
        });

    },
    getAllMCPTools: (mpcName: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getAllMCPTools",
                "mpcName": mpcName
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getAllMCPToolsResponse") {
                        resolve(response.data);
                    } 
                } catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            cbws.getWebsocket.on('error', (error: Error) => {
                reject(error);
            });
        });
    },
    getMCPTool: (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getMCPTool",
                "mcpName": name
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getMCPToolResponse") {
                        resolve(response.data);
                    } 
                } catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            cbws.getWebsocket.on('error', (error: Error) => {
                reject(error);
            });
        });
    },
    getEnabledMCPS: (): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getEnabledMCPS"
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getEnabledMCPSResponse") {
                        resolve(response.data);
                    } 
                } catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            cbws.getWebsocket.on('error', (error: Error) => {
                reject(error);
            });
        });
    },
}

export default codeboltMCP;