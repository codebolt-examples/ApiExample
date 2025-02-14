import cbws from './websocket';
import {MemorySetResponse,MemoryGetResponse  } from '@codebolt/types';

/**
 * A module for handling in-memory database operations via WebSocket.
 */
const dbmemory = {
    /**
     * Adds a key-value pair to the in-memory database.
     * @param {string} key - The key under which to store the value.
     * @param {any} value - The value to be stored.
     * @returns {Promise<MemorySetResponse>} A promise that resolves with the response from the memory set event.
     */
    addKnowledge: (key: string, value: any): Promise<MemorySetResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "memoryEvent",
                'action': 'set',
                key,
                value
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "memorySetResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },
    /**
     * Retrieves a value from the in-memory database by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<MemoryGetResponse>} A promise that resolves with the response from the memory get event.
     */
    getKnowledge: (key: string): Promise<MemoryGetResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "memoryEvent",
                'action': 'get',
                key
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "memoryGetResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    }
};

export default dbmemory;
