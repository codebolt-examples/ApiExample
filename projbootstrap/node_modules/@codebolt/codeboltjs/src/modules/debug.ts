import cbws from './websocket';
import {DebugAddLogResponse,OpenDebugBrowserResponse } from '@codebolt/types';
export enum logType{
    info="info",
    error="error",
    warning="warning"
}


export const debug={
    /**
     * Sends a log message to the debug websocket and waits for a response.
     * @param {string} log - The log message to send.
     * @param {logType} type - The type of the log message (info, error, warning).
     * @returns {Promise<DebugAddLogResponse>} A promise that resolves with the response from the debug event.
     */
    debug:(log:string,type:logType):Promise<DebugAddLogResponse>=> {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "debugEvent",
                "action":"addLog",
                message:{
                   log,
                   type
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "debugEventResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            })
        })
      

    },
    /**
     * Requests to open a debug browser at the specified URL and port.
     * @param {string} url - The URL where the debug browser should be opened.
     * @param {number} port - The port on which the debug browser will listen.
     * @returns {Promise<OpenDebugBrowserResponse>} A promise that resolves with the response from the open debug browser event.
     */
    openDebugBrowser:(url:string,port:number):Promise<OpenDebugBrowserResponse>=>{
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "debugEvent",
                "action":"openDebugBrowser",
                message:{
                   url,
                   port
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "openDebugBrowserResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            })
        })
       
    }
}


export default debug;



