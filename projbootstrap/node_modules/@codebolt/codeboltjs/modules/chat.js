"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// chat.ts
const websocket_1 = __importDefault(require("./websocket"));
const events_1 = require("events");
/**
 * CustomEventEmitter class that extends the Node.js EventEmitter class.
 */
class CustomEventEmitter extends events_1.EventEmitter {
}
let eventEmitter = new CustomEventEmitter();
/**
 * Chat module to interact with the WebSocket server.
 */
const cbchat = {
    /**
     * Retrieves the chat history from the server.
     * @returns {Promise<ChatMessage[]>} A promise that resolves with an array of ChatMessage objects representing the chat history.
     */
    getChatHistory: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "getChatHistory"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getChatHistoryResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },
    /**
     * Sets up a listener for incoming WebSocket messages and emits a custom event when a message is received.
     * @returns {EventEmitter} The event emitter used for emitting custom events.
     */
    onActionMessage: () => {
        if (!websocket_1.default.getWebsocket)
            return;
        websocket_1.default.getWebsocket.on('message', (data) => {
            const response = JSON.parse(data);
            if (response.type === "messageResponse") {
                // Pass a callback function as an argument to the emit method
                eventEmitter.emit("userMessage", response, (message) => {
                    console.log("Callback function invoked with message:", message);
                    websocket_1.default.getWebsocket.send(JSON.stringify({
                        "type": "processStoped"
                    }));
                });
            }
        });
        return eventEmitter;
    },
    /**
     * Sends a message through the WebSocket connection.
     * @param {string} message - The message to be sent.
     */
    sendMessage: (message, payload) => {
        console.log(message);
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "sendMessage",
            "message": message,
            payload
        }));
    },
    /**
     * Waits for a reply to a sent message.
     * @param {string} message - The message for which a reply is expected.
     * @returns {Promise<UserMessage>} A promise that resolves with the reply.
     */
    waitforReply: (message) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "waitforReply",
                "message": message
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "waitFormessageResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },
    /**
     * Notifies the server that a process has started and sets up an event listener for stopProcessClicked events.
     * @returns An object containing the event emitter and a stopProcess method.
     */
    processStarted: () => {
        // Send the process started message
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "processStarted"
        }));
        // Register event listener for WebSocket messages
        websocket_1.default.getWebsocket.on('message', (data) => {
            const message = JSON.parse(data);
            console.log("Received message:", message);
            if (message.type === 'stopProcessClicked')
                // Emit a custom event based on the message type
                eventEmitter.emit("stopProcessClicked", message);
        });
        // Return an object that includes the event emitter and the stopProcess method
        return {
            event: eventEmitter,
            stopProcess: () => {
                // Implement the logic to stop the process here
                console.log("Stopping process...");
                // For example, you might want to send a specific message to the server to stop the process
                websocket_1.default.getWebsocket.send(JSON.stringify({
                    "type": "processStoped"
                }));
            }
        };
    },
    /**
     * Stops the ongoing process.
     * Sends a specific message to the server to stop the process.
     */
    stopProcess: () => {
        // Implement the logic to stop the process here
        console.log("Stopping process...");
        // For example, you might want to send a specific message to the server to stop the process
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "processStoped"
        }));
    },
    /**
   * Stops the ongoing process.
   * Sends a specific message to the server to stop the process.
   */
    processFinished: () => {
        // Implement the logic to stop the process here
        console.log("Process Finished ...");
        // For example, you might want to send a specific message to the server to stop the process
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "processFinished"
        }));
    },
    /**
     * Sends a confirmation request to the server with two options: Yes or No.
     * @returns {Promise<string>} A promise that resolves with the server's response.
     */
    sendConfirmationRequest: (confirmationMessage, buttons = [], withFeedback = false) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "confirmationRequest",
                "message": confirmationMessage,
                buttons: buttons,
                withFeedback
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "confirmationResponse" || response.type === "feedbackResponse") {
                    resolve(response); // Resolve the Promise with the server's response
                }
            });
        });
    },
    askQuestion: (question, buttons = [], withFeedback = false) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "confirmationRequest",
                "message": question,
                buttons: buttons,
                withFeedback
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "confirmationResponse" || response.type === "feedbackResponse") {
                    resolve(response); // Resolve the Promise with the server's response
                }
            });
        });
    },
    /**
 * Sends a notification event to the server.
 * @param {string} notificationMessage - The message to be sent in the notification.
 */
    sendNotificationEvent: (notificationMessage, type) => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "notificationEvent",
            "message": notificationMessage,
            "eventType": type
        }));
    },
};
exports.default = cbchat;
