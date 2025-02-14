"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./modules/websocket"));
const fs_1 = __importDefault(require("./modules/fs"));
const llm_1 = __importDefault(require("./modules/llm"));
const terminal_1 = __importDefault(require("./modules/terminal"));
const browser_1 = __importDefault(require("./modules/browser"));
const chat_1 = __importDefault(require("./modules/chat"));
const codeutils_1 = __importDefault(require("./modules/codeutils"));
const docutils_1 = __importDefault(require("./modules/docutils"));
const crawler_1 = __importDefault(require("./modules/crawler"));
const search_1 = __importDefault(require("./modules/search"));
const knowledge_1 = __importDefault(require("./modules/knowledge"));
const rag_1 = __importDefault(require("./modules/rag"));
const codeparsers_1 = __importDefault(require("./modules/codeparsers"));
const outputparsers_1 = __importDefault(require("./modules/outputparsers"));
const project_1 = __importDefault(require("./modules/project"));
const git_1 = __importDefault(require("./modules/git"));
const dbmemory_1 = __importDefault(require("./modules/dbmemory"));
const state_1 = __importDefault(require("./modules/state"));
const task_1 = __importDefault(require("./modules/task"));
const vectordb_1 = __importDefault(require("./modules/vectordb"));
const debug_1 = __importDefault(require("./modules/debug"));
const tokenizer_1 = __importDefault(require("./modules/tokenizer"));
const ws_1 = __importDefault(require("ws"));
const history_1 = require("./modules/history");
const mcp_1 = __importDefault(require("./modules/mcp"));
const agent_1 = __importDefault(require("./modules/agent"));
/**
 * @class Codebolt
 * @description This class provides a unified interface to interact with various modules.
 */
class Codebolt {
    /**
     * @constructor
     * @description Initializes the websocket connection.
     */
    constructor() {
        this.websocket = null;
        this.fs = fs_1.default;
        this.git = git_1.default;
        this.llm = llm_1.default;
        this.browser = browser_1.default;
        this.chat = chat_1.default;
        this.terminal = terminal_1.default;
        this.codeutils = codeutils_1.default;
        this.docutils = docutils_1.default;
        this.crawler = crawler_1.default;
        this.search = search_1.default;
        this.knowledge = knowledge_1.default;
        this.rag = rag_1.default;
        this.codeparsers = codeparsers_1.default;
        this.outputparsers = outputparsers_1.default;
        this.project = project_1.default;
        this.dbmemory = dbmemory_1.default;
        this.cbstate = state_1.default;
        this.taskplaner = task_1.default;
        this.vectordb = vectordb_1.default;
        this.debug = debug_1.default;
        this.tokenizer = tokenizer_1.default;
        this.chatSummary = history_1.chatSummary;
        this.MCP = mcp_1.default;
        this.AGENT = agent_1.default;
        this.websocket = websocket_1.default.getWebsocket;
    }
    /**
     * @method waitForConnection
     * @description Waits for the WebSocket connection to open.
     * @returns {Promise<void>} A promise that resolves when the WebSocket connection is open.
     */
    async waitForConnection() {
        return new Promise((resolve, reject) => {
            if (!this.websocket) {
                reject(new Error('WebSocket is not initialized'));
                return;
            }
            if (this.websocket.readyState === ws_1.default.OPEN) {
                resolve();
                return;
            }
            this.websocket.addEventListener('open', () => {
                resolve();
            });
            this.websocket.addEventListener('error', (error) => {
                reject(error);
            });
        });
    }
}
exports.default = new Codebolt();
// module.exports = new Codebolt();
