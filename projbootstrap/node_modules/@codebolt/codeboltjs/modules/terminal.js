"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
const events_1 = require("events");
/**
 * CustomEventEmitter class that extends the Node.js EventEmitter class.
 */
class CustomEventEmitter extends events_1.EventEmitter {
}
/**
 * A module for executing commands in a terminal-like environment via WebSocket.
 */
const cbterminal = {
    eventEmitter: new CustomEventEmitter(),
    /**
     * Executes a given command and returns the result.
     * Listens for messages from the WebSocket that indicate the output, error, or finish state
     * of the executed command and resolves the promise accordingly.
     *
     * @param {string} command - The command to be executed.
     * @returns {Promise<CommandOutput|CommandError>} A promise that resolves with the command's output, error, or finish signal.
     */
    executeCommand: async (command, returnEmptyStringOnSuccess = false) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "executeCommand",
                "message": command,
                returnEmptyStringOnSuccess
            }));
            let result = "";
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "commandError" || response.type === "commandFinish") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Executes a given command and keeps running until an error occurs.
     * Listens for messages from the WebSocket and resolves the promise when an error is encountered.
     *
     * @param {string} command - The command to be executed.
     * @returns {Promise<CommandError>} A promise that resolves when an error occurs during command execution.
     */
    executeCommandRunUntilError: async (command, executeInMain = false) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "executeCommandRunUntilError",
                "message": command,
                executeInMain
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "commandError") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Sends a manual interrupt signal to the terminal.
     *
     * @returns {Promise<TerminalInterruptResponse>}
     */
    sendManualInterrupt() {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "sendInterruptToTerminal"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "terminalInterrupted") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Executes a given command and streams the output.
     * Listens for messages from the WebSocket and streams the output data.
     *
     * @param {string} command - The command to be executed.
     * @returns {EventEmitter} A promise that streams the output data during command execution.
     */
    executeCommandWithStream(command, executeInMain = false) {
        // Send the process started message
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "executeCommandWithStream",
            "message": command,
            executeInMain
        }));
        // Register event listener for WebSocket messages
        websocket_1.default.getWebsocket.on('message', (data) => {
            const response = JSON.parse(data);
            console.log("Received message:", response);
            if (response.type === "commandOutput" || response.type === "commandError" || response.type === "commandFinish") {
                this.eventEmitter.emit(response.type, response);
            }
        });
        // Return an object that includes the event emitter and the stopProcess method
        return this.eventEmitter;
    }
};
exports.default = cbterminal;
