import { ApplicationState, AddToAgentStateResponse, GetAgentStateResponse } from '@codebolt/types';
declare const cbstate: {
    /**
     * Retrieves the current application state from the server via WebSocket.
     * @returns {Promise<ApplicationState>} A promise that resolves with the application state.
     */
    getApplicationState: () => Promise<ApplicationState>;
    /**
     * Adds a key-value pair to the agent's state on the server via WebSocket.
     * @param {string} key - The key to add to the agent's state.
     * @param {string} value - The value associated with the key.
     * @returns {Promise<AddToAgentStateResponse>} A promise that resolves with the response to the addition request.
     */
    addToAgentState: (key: string, value: string) => Promise<AddToAgentStateResponse>;
    /**
     * Retrieves the current state of the agent from the server via WebSocket.
     * @returns {Promise<GetAgentStateResponse>} A promise that resolves with the agent's state.
     */
    getAgentState: () => Promise<GetAgentStateResponse>;
    /**
     * Retrieves the current project state from the server via WebSocket.
     * @returns {Promise<GetProjectStateResponse>} A promise that resolves with the project's state.
     */
    getProjectState: () => Promise<any>;
    /**
     * Updates the project state on the server via WebSocket.
     * @returns {Promise<UpdateProjectStateResponse>} A promise that resolves with the response to the update request.
     */
    updateProjectState: (key: string, value: any) => Promise<any>;
};
export default cbstate;
