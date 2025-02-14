import { AddTokenResponse, GetTokenResponse } from '@codebolt/types';
/**
 * Tokenizer module for handling token-related operations.
 */
declare const tokenizer: {
    /**
     * Adds a token to the system via WebSocket.
     * @param {string} key - The key associated with the token to be added.
     * @returns {Promise<AddTokenResponse>} A promise that resolves with the response from the add token event.
     */
    addToken: (key: string) => Promise<AddTokenResponse>;
    /**
     * Retrieves a token from the system via WebSocket.
     * @param {string} key - The key associated with the token to be retrieved.
     * @returns {Promise<GetTokenResponse>} A promise that resolves with the response from the get token event.
     */
    getToken: (key: string) => Promise<GetTokenResponse>;
};
export default tokenizer;
