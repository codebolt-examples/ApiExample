import cbws from './websocket';
import { EventEmitter } from 'events';
import {CommandError,CommandFinish,CommandOutput,TerminalInterruptResponse,TerminalInterrupted } from '@codebolt/types';
/**
 * CustomEventEmitter class that extends the Node.js EventEmitter class.
 */
class CustomEventEmitter extends EventEmitter {}
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
    executeCommand: async (command:string, returnEmptyStringOnSuccess:boolean = false) => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "executeCommand",
                "message": command,
                returnEmptyStringOnSuccess
            }));
            let result = "";
            cbws.getWebsocket.on('message', (data:string) => {
                const response = JSON.parse(data);
                if (response.type === "commandError" || response.type === "commandFinish" ) {
                   resolve(response)
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
    executeCommandRunUntilError: async (command: string,executeInMain=false): Promise<CommandError> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "executeCommandRunUntilError",
                "message": command,
                executeInMain
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if ( response.type === "commandError") {
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
    sendManualInterrupt(): Promise<TerminalInterruptResponse>  {
       
        return new Promise((resolve, reject) => {
           cbws.getWebsocket.send(JSON.stringify({
            "type": "sendInterruptToTerminal"
        }));
            cbws.getWebsocket.on('message', (data: string) => {
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
    executeCommandWithStream(command: string,executeInMain=false):EventEmitter {
         // Send the process started message
         cbws.getWebsocket.send(JSON.stringify({
            "type": "executeCommandWithStream",
            "message": command
            ,executeInMain
        }));
        // Register event listener for WebSocket messages
        cbws.getWebsocket.on('message', (data: string) => {
            const response = JSON.parse(data);
            console.log("Received message:", response);
            if (response.type === "commandOutput" || response.type === "commandError" || response.type === "commandFinish") {
                this.eventEmitter.emit(response.type, response);
            }
        });

        // Return an object that includes the event emitter and the stopProcess method
        return this.eventEmitter
    
    }
   

 
};
export default cbterminal;