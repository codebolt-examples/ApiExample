import { AddTokenResponse, GetTokenResponse } from '@codebolt/types';
import cbws from './websocket';

/**
 * Tokenizer module for handling token-related operations.
 */
const tokenizer = {
  
    /**
     * Adds a token to the system via WebSocket.
     * @param {string} key - The key associated with the token to be added.
     * @returns {Promise<AddTokenResponse>} A promise that resolves with the response from the add token event.
     */
    addToken: async (key: string): Promise<AddTokenResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"tokenizerEvent",
                "action": "addToken",
                "message": {
                    item: key
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "addTokenResponse") {
                    resolve(response);
                }
            });
        });
    },

    /**
     * Retrieves a token from the system via WebSocket.
     * @param {string} key - The key associated with the token to be retrieved.
     * @returns {Promise<GetTokenResponse>} A promise that resolves with the response from the get token event.
     */
    getToken: async (key: string): Promise<GetTokenResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"tokenizerEvent",
                "action": "getToken",
                "message": {
                    item: key
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getTokenResponse") {
                    resolve(response);
                }
            });
        });
    }
}

export default tokenizer