import WebSocket from 'ws';
/**
 * Class representing a WebSocket connection.
 */
declare class cbws {
    websocket: WebSocket;
    /**
     * Constructs a new cbws instance and initializes the WebSocket connection.
     */
    constructor();
    private getUniqueConnectionId;
    private getInitialMessage;
    /**
     * Initializes the WebSocket by setting up event listeners and returning a promise that resolves
     * when the WebSocket connection is successfully opened.
     * @returns {Promise<WebSocket>} A promise that resolves with the WebSocket instance.
     */
    private initializeWebSocket;
    /**
     * Getter for the WebSocket instance. Throws an error if the WebSocket is not open.
     * @returns {WebSocket} The WebSocket instance.
     * @throws {Error} If the WebSocket is not open.
     */
    get getWebsocket(): WebSocket;
}
declare const _default: cbws;
export default _default;
