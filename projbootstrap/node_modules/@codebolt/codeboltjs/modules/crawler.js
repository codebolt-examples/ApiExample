"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
/**
 * A module for controlling a web crawler through WebSocket messages.
 */
const cbcrawler = {
    /**
     * Starts the crawler.
     */
    start: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'start'
        }));
    },
    /**
     * Takes a screenshot using the crawler.
     */
    screenshot: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'screenshot'
        }));
    },
    /**
     * Directs the crawler to navigate to a specified URL.
     * @param url - The URL for the crawler to navigate to.
     */
    goToPage: (url) => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'goToPage',
            url
        }));
    },
    /**
     * Scrolls the crawler in a specified direction.
     * @param direction - The direction to scroll ('up', 'down', 'left', 'right').
     */
    scroll: (direction) => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'scroll',
            direction
        }));
    },
    /**
     * Simulates a click event on an element with the specified ID.
     * @param id - The ID of the element to be clicked.
     * @returns {Promise<any>} A promise that resolves when the click action is complete.
     */
    click: (id) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "crawlerEvent",
                action: 'click',
                id
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "clickFinished") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Types the provided text into an element with the specified ID.
     * @param id - The ID of the element where text will be typed.
     * @param text - The text to type into the element.
     * @returns {Promise<any>} A promise that resolves when the type action is complete.
     */
    type: (id, text) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "crawlerEvent",
                action: 'type',
                id,
                text
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "typeFinished") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Simulates the Enter key press using the crawler.
     */
    enter: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'enter'
        }));
    },
    /**
     * Initiates a crawl process.
     */
    crawl: (query) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "crawlerEvent",
                "action": 'crawl',
                "message": {
                    query
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "crawlResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    }
};
exports.default = cbcrawler;
