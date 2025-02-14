"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
/**
 * Class representing a WebSocket connection.
 */
class cbws {
    /**
     * Constructs a new cbws instance and initializes the WebSocket connection.
     */
    constructor() {
        const uniqueConnectionId = this.getUniqueConnectionId();
        const initialMessage = this.getInitialMessage();
        const agentIdParam = process.env.agentId ? `&agentId=${process.env.agentId}` : '';
        const parentIdParam = process.env.parentId ? `&parentId=${process.env.parentId}` : '';
        this.websocket = new ws_1.default(`ws://localhost:${process.env.SOCKET_PORT}/codebolt?id=${uniqueConnectionId}${agentIdParam}${parentIdParam}${process.env.Is_Dev ? '&dev=true' : ''}`);
        this.initializeWebSocket(initialMessage).catch(error => {
            console.error("WebSocket connection failed:", error);
        });
    }
    getUniqueConnectionId() {
        try {
            let fileContents = fs_1.default.readFileSync('./codeboltagent.yaml', 'utf8');
            let data = js_yaml_1.default.load(fileContents);
            return data.unique_connectionid;
        }
        catch (e) {
            console.error('Unable to locate codeboltagent.yaml file.');
            return '';
        }
    }
    getInitialMessage() {
        try {
            let fileContents = fs_1.default.readFileSync('./codeboltagent.yaml', 'utf8');
            let data = js_yaml_1.default.load(fileContents);
            return data.initial_message;
        }
        catch (e) {
            console.error('Unable to locate codeboltagent.yaml file.');
            return '';
        }
    }
    /**
     * Initializes the WebSocket by setting up event listeners and returning a promise that resolves
     * when the WebSocket connection is successfully opened.
     * @returns {Promise<WebSocket>} A promise that resolves with the WebSocket instance.
     */
    async initializeWebSocket(initialMessage) {
        return new Promise((resolve, reject) => {
            this.websocket.on('error', (error) => {
                console.log('WebSocket error:', error);
                reject(error);
            });
            this.websocket.on('open', () => {
                console.log('WebSocket connected');
                // if (this.websocket) {
                //     this.websocket.send(JSON.stringify({
                //         "type": "sendMessage",
                //         "message": initialMessage
                //     }));
                //     resolve(this.websocket);
                // }
            });
            this.websocket.on('message', (data) => {
                // Handle incoming WebSocket messages here.
                // console.log('WebSocket message received:', data);
            });
        });
    }
    /**
     * Getter for the WebSocket instance. Throws an error if the WebSocket is not open.
     * @returns {WebSocket} The WebSocket instance.
     * @throws {Error} If the WebSocket is not open.
     */
    get getWebsocket() {
        if (!this.websocket.OPEN) {
            throw new Error('WebSocket is not open');
        }
        else {
            return this.websocket;
        }
    }
}
exports.default = new cbws();
