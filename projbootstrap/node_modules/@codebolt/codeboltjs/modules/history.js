"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSummary = exports.logType = void 0;
const websocket_1 = __importDefault(require("./websocket"));
var logType;
(function (logType) {
    logType["info"] = "info";
    logType["error"] = "error";
    logType["warning"] = "warning";
})(logType || (exports.logType = logType = {}));
exports.chatSummary = {
    summarizeAll: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "chatSummaryEvent",
                "action": "summarizeAll",
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getSummarizeAllResponse") {
                    resolve(response.payload); // Resolve the Promise with the response data
                }
            });
        });
    },
    summarize: (messages, depth) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "chatSummaryEvent",
                "action": "summarize",
                messages,
                depth
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getSummarizeResponse") {
                    resolve(response.payload); // Resolve the Promise with the response data
                }
            });
        });
    }
};
exports.default = exports.chatSummary;
