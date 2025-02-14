"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
/**
 * A module for interacting with a browser through WebSockets.
 */
const cbbrowser = {
    /**
     * Opens a new page in the browser.
     */
    newPage: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'newPage'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "newPageResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves the current URL of the browser's active page.
     * @returns {Promise<UrlResponse>} A promise that resolves with the URL.
     */
    getUrl: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'getUrl'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "getUrlResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Navigates to a specified URL.
     * @param {string} url - The URL to navigate to.
     * @returns {Promise<GoToPageResponse>} A promise that resolves when navigation is complete.
     */
    goToPage: (url) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'goToPage',
                url
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "goToPageResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Takes a screenshot of the current page.
     */
    screenshot: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'screenshot'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "screenshotResponse") {
                    resolve(response.payload);
                }
            });
        });
    },
    /**
     * Retrieves the HTML content of the current page.
     * @returns {Promise<HtmlReceived>} A promise that resolves with the HTML content.
     */
    getHTML: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'getHTML'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "htmlReceived") {
                    resolve(response.htmlResponse);
                }
            });
        });
    },
    /**
     * Retrieves the Markdown content of the current page.
     * @returns {Promise<GetMarkdownResponse>} A promise that resolves with the Markdown content.
     */
    getMarkdown: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'getMarkdown'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "getMarkdownResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves the PDF content of the current page.
     *
     */
    getPDF: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "browserEvent",
            action: 'getPDF'
        }));
    },
    /**
     * Converts the PDF content of the current page to text.
     */
    pdfToText: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "browserEvent",
            action: 'pdfToText'
        }));
    },
    /**
     * Retrieves the content of the current page.
     *  @returns {Promise<GetContentResponse>} A promise that resolves with the content.
     */
    getContent: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'getContent'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "getContentResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves the snapshot of the current page.
     *  @returns {Promise<GetContentResponse>} A promise that resolves with the content.
     */
    getSnapShot: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'getSnapShot'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "getSnapShotResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves browser info like height width scrollx scrolly of the current page.
     *  @returns {Promise<GetContentResponse>} A promise that resolves with the content.
     */
    getBrowserInfo: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'getBrowserInfo'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "getBrowserInfoResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Extracts text from the current page.
     *  @returns {Promise<ExtractTextResponse>} A promise that resolves with the extracted text.
     *
     */
    extractText: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'extractText'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "extractTextResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Closes the current page.
     */
    close: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "browserEvent",
            action: 'close'
        }));
    },
    /**
     * Scrolls the current page in a specified direction by a specified number of pixels.
     * @param {string} direction - The direction to scroll.
     * @param {string} pixels - The number of pixels to scroll.
     * @returns {Promise<any>} A promise that resolves when the scroll action is complete.
     */
    scroll: (direction, pixels) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'scroll',
                direction,
                pixels
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "scrollResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Types text into a specified element on the page.
     * @param {string} elementid - The ID of the element to type into.
     * @param {string} text - The text to type.
     * @returns {Promise<any>} A promise that resolves when the typing action is complete.
     */
    type: (elementid, text) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'type',
                text,
                elementid
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "typeResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Clicks on a specified element on the page.
     * @param {string} elementid - The ID of the element to click.
     * @returns {Promise<any>} A promise that resolves when the click action is complete.
     */
    click: (elementid) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'click',
                elementid
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "clickResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Simulates the Enter key press on the current page.
     * @returns {Promise<any>} A promise that resolves when the Enter action is complete.
     */
    enter: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'enter'
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "EnterResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Performs a search on the current page using a specified query.
     * @param {string} elementid - The ID of the element to perform the search in.
     * @param {string} query - The search query.
     * @returns {Promise<any>} A promise that resolves with the search results.
     */
    search: (elementid, query) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "browserEvent",
                action: 'search',
                elementid,
                query
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.event === "searchResponse") {
                    resolve(response);
                }
            });
        });
    }
};
exports.default = cbbrowser;
/***

start_browser(objective: string, url: string, previous_command: string, browser_content: string) {
    cbbrowser.newPage();
}
 */ 
