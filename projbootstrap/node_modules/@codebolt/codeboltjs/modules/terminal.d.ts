/// <reference types="node" />
import { EventEmitter } from 'events';
import { CommandError, TerminalInterruptResponse } from '@codebolt/types';
/**
 * CustomEventEmitter class that extends the Node.js EventEmitter class.
 */
declare class CustomEventEmitter extends EventEmitter {
}
/**
 * A module for executing commands in a terminal-like environment via WebSocket.
 */
declare const cbterminal: {
    eventEmitter: CustomEventEmitter;
    /**
     * Executes a given command and returns the result.
     * Listens for messages from the WebSocket that indicate the output, error, or finish state
     * of the executed command and resolves the promise accordingly.
     *
     * @param {string} command - The command to be executed.
     * @returns {Promise<CommandOutput|CommandError>} A promise that resolves with the command's output, error, or finish signal.
     */
    executeCommand: (command: string, returnEmptyStringOnSuccess?: boolean) => Promise<unknown>;
    /**
     * Executes a given command and keeps running until an error occurs.
     * Listens for messages from the WebSocket and resolves the promise when an error is encountered.
     *
     * @param {string} command - The command to be executed.
     * @returns {Promise<CommandError>} A promise that resolves when an error occurs during command execution.
     */
    executeCommandRunUntilError: (command: string, executeInMain?: boolean) => Promise<CommandError>;
    /**
     * Sends a manual interrupt signal to the terminal.
     *
     * @returns {Promise<TerminalInterruptResponse>}
     */
    sendManualInterrupt(): Promise<TerminalInterruptResponse>;
    /**
     * Executes a given command and streams the output.
     * Listens for messages from the WebSocket and streams the output data.
     *
     * @param {string} command - The command to be executed.
     * @returns {EventEmitter} A promise that streams the output data during command execution.
     */
    executeCommandWithStream(command: string, executeInMain?: boolean): EventEmitter;
};
export default cbterminal;
