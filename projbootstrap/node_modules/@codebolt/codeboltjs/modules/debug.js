"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.logType = void 0;
const websocket_1 = __importDefault(require("./websocket"));
var logType;
(function (logType) {
    logType["info"] = "info";
    logType["error"] = "error";
    logType["warning"] = "warning";
})(logType || (exports.logType = logType = {}));
exports.debug = {
    /**
     * Sends a log message to the debug websocket and waits for a response.
     * @param {string} log - The log message to send.
     * @param {logType} type - The type of the log message (info, error, warning).
     * @returns {Promise<DebugAddLogResponse>} A promise that resolves with the response from the debug event.
     */
    debug: (log, type) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "debugEvent",
                "action": "addLog",
                message: {
                    log,
                    type
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "debugEventResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },
    /**
     * Requests to open a debug browser at the specified URL and port.
     * @param {string} url - The URL where the debug browser should be opened.
     * @param {number} port - The port on which the debug browser will listen.
     * @returns {Promise<OpenDebugBrowserResponse>} A promise that resolves with the response from the open debug browser event.
     */
    openDebugBrowser: (url, port) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "debugEvent",
                "action": "openDebugBrowser",
                message: {
                    url,
                    port
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "openDebugBrowserResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    }
};
exports.default = exports.debug;
