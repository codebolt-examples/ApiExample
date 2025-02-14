"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
const codeboltMCP = {
    executeTool: (toolName, params, mcpServer) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "executeTool",
                "toolName": toolName,
                "params": params
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "executeToolResponse") {
                        resolve(response.data);
                    }
                }
                catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            websocket_1.default.getWebsocket.on('error', (error) => {
                reject(error);
            });
        });
    },
    getMcpTools: (tools) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getMcpTools",
                "tools": tools
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getMcpToolsResponse") {
                        resolve(response.data);
                    }
                }
                catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            websocket_1.default.getWebsocket.on('error', (error) => {
                reject(error);
            });
        });
    },
    getAllMCPTools: (mpcName) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getAllMCPTools",
                "mpcName": mpcName
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getAllMCPToolsResponse") {
                        resolve(response.data);
                    }
                }
                catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            websocket_1.default.getWebsocket.on('error', (error) => {
                reject(error);
            });
        });
    },
    getMCPTool: (name) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getMCPTool",
                "mcpName": name
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getMCPToolResponse") {
                        resolve(response.data);
                    }
                }
                catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            websocket_1.default.getWebsocket.on('error', (error) => {
                reject(error);
            });
        });
    },
    getEnabledMCPS: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "mcpEvent",
                "action": "getEnabledMCPS"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                try {
                    const response = JSON.parse(data);
                    if (response.type === "getEnabledMCPSResponse") {
                        resolve(response.data);
                    }
                }
                catch (error) {
                    reject(new Error("Failed to parse response"));
                }
            });
            websocket_1.default.getWebsocket.on('error', (error) => {
                reject(error);
            });
        });
    },
};
exports.default = codeboltMCP;
