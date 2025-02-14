import cbws from './websocket';

/**
 * A module for controlling a web crawler through WebSocket messages.
 */
const cbcrawler = {
    /**
     * Starts the crawler.
     */
    start: () => {
       cbws.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'start'
        }));
    },
    /**
     * Takes a screenshot using the crawler.
     */
    screenshot: () => {
       cbws.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'screenshot'
        }));
    },
    /**
     * Directs the crawler to navigate to a specified URL.
     * @param url - The URL for the crawler to navigate to.
     */
    goToPage: (url: string) => {
       cbws.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'goToPage',
            url
        }));
    },
    /**
     * Scrolls the crawler in a specified direction.
     * @param direction - The direction to scroll ('up', 'down', 'left', 'right').
     */
    scroll: (direction: string) => {
       cbws.getWebsocket.send(JSON.stringify({
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
    click: (id: string) => {
        return new Promise((resolve, reject) => {
           cbws.getWebsocket.send(JSON.stringify({
                "type": "crawlerEvent",
                action: 'click',
                id
            }));
           cbws.getWebsocket.on('message', (data: string) => {
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
    type: (id: string, text: string) => {
        return new Promise((resolve, reject) => {
           cbws.getWebsocket.send(JSON.stringify({
                "type": "crawlerEvent",
                action: 'type',
                id,
                text
            }));
           cbws.getWebsocket.on('message', (data: string) => {
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
       cbws.getWebsocket.send(JSON.stringify({
            "type": "crawlerEvent",
            action: 'enter'
        }));
    },
    /**
     * Initiates a crawl process.
     */
    crawl: (query:string) => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "crawlerEvent",
                "action": 'crawl',
                "message":{
                    query
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "crawlResponse") {
                    resolve(response); // Resolve the Promise with the response data
                } 
            });
        });
  
    }
};

export default cbcrawler;
