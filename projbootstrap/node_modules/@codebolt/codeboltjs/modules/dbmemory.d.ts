import { MemorySetResponse, MemoryGetResponse } from '@codebolt/types';
/**
 * A module for handling in-memory database operations via WebSocket.
 */
declare const dbmemory: {
    /**
     * Adds a key-value pair to the in-memory database.
     * @param {string} key - The key under which to store the value.
     * @param {any} value - The value to be stored.
     * @returns {Promise<MemorySetResponse>} A promise that resolves with the response from the memory set event.
     */
    addKnowledge: (key: string, value: any) => Promise<MemorySetResponse>;
    /**
     * Retrieves a value from the in-memory database by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<MemoryGetResponse>} A promise that resolves with the response from the memory get event.
     */
    getKnowledge: (key: string) => Promise<MemoryGetResponse>;
};
export default dbmemory;
