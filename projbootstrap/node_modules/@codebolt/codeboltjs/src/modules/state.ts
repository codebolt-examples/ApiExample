import cbws from './websocket';
import {ApplicationState,AddToAgentStateResponse,GetAgentStateResponse } from '@codebolt/types';

const cbstate = {
    /**
     * Retrieves the current application state from the server via WebSocket.
     * @returns {Promise<ApplicationState>} A promise that resolves with the application state.
     */
    getApplicationState: async (): Promise<ApplicationState> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "projectStateEvent",
                "action": "getAppState",
                
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getAppStateResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },
    /**
     * Adds a key-value pair to the agent's state on the server via WebSocket.
     * @param {string} key - The key to add to the agent's state.
     * @param {string} value - The value associated with the key.
     * @returns {Promise<AddToAgentStateResponse>} A promise that resolves with the response to the addition request.
     */
    addToAgentState: async (key: string, value: string): Promise<AddToAgentStateResponse> => {
      return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "agentStateEvent",
                "action":"addToAgentState",
                payload:{
                    key,
                    value
                }
                
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "addToAgentStateResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });  
    },
    /**
     * Retrieves the current state of the agent from the server via WebSocket.
     * @returns {Promise<GetAgentStateResponse>} A promise that resolves with the agent's state.
     */
    getAgentState: async (): Promise<GetAgentStateResponse> => {
       return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "agentStateEvent",
                "action":"getAgentState",
                
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getAgentStateResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });  
    },


    /**
     * Retrieves the current project state from the server via WebSocket.
     * @returns {Promise<GetProjectStateResponse>} A promise that resolves with the project's state.
     */
    getProjectState: async (): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "projectStateEvent",
                "action": "getProjectState",
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getProjectStateResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },

    /**
     * Updates the project state on the server via WebSocket.
     * @returns {Promise<UpdateProjectStateResponse>} A promise that resolves with the response to the update request.
     */
    updateProjectState: async (key:string,value:any): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "projectStateEvent",
                "action": "updateProjectState",
                payload:{
                    key,
                    value
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "updateProjectStateResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    }


};

export default cbstate;
