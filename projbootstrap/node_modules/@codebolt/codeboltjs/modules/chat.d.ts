/// <reference types="node" />
import { EventEmitter } from 'events';
import { ChatMessage, UserMessage } from '@codebolt/types';
/**
 * CustomEventEmitter class that extends the Node.js EventEmitter class.
 */
declare class CustomEventEmitter extends EventEmitter {
}
/**
 * Chat module to interact with the WebSocket server.
 */
declare const cbchat: {
    /**
     * Retrieves the chat history from the server.
     * @returns {Promise<ChatMessage[]>} A promise that resolves with an array of ChatMessage objects representing the chat history.
     */
    getChatHistory: () => Promise<ChatMessage[]>;
    /**
     * Sets up a listener for incoming WebSocket messages and emits a custom event when a message is received.
     * @returns {EventEmitter} The event emitter used for emitting custom events.
     */
    onActionMessage: () => CustomEventEmitter | undefined;
    /**
     * Sends a message through the WebSocket connection.
     * @param {string} message - The message to be sent.
     */
    sendMessage: (message: string, payload: any) => void;
    /**
     * Waits for a reply to a sent message.
     * @param {string} message - The message for which a reply is expected.
     * @returns {Promise<UserMessage>} A promise that resolves with the reply.
     */
    waitforReply: (message: string) => Promise<UserMessage>;
    /**
     * Notifies the server that a process has started and sets up an event listener for stopProcessClicked events.
     * @returns An object containing the event emitter and a stopProcess method.
     */
    processStarted: () => {
        event: CustomEventEmitter;
        stopProcess: () => void;
    };
    /**
     * Stops the ongoing process.
     * Sends a specific message to the server to stop the process.
     */
    stopProcess: () => void;
    /**
   * Stops the ongoing process.
   * Sends a specific message to the server to stop the process.
   */
    processFinished: () => void;
    /**
     * Sends a confirmation request to the server with two options: Yes or No.
     * @returns {Promise<string>} A promise that resolves with the server's response.
     */
    sendConfirmationRequest: (confirmationMessage: string, buttons?: string[], withFeedback?: boolean) => Promise<string>;
    askQuestion: (question: string, buttons?: string[], withFeedback?: boolean) => Promise<string>;
    /**
 * Sends a notification event to the server.
 * @param {string} notificationMessage - The message to be sent in the notification.
 */
    sendNotificationEvent: (notificationMessage: string, type: 'debug' | 'git' | 'planner' | 'browser' | 'editor' | 'terminal' | 'preview') => void;
};
export default cbchat;
