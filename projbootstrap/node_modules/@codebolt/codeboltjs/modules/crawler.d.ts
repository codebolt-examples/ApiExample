/**
 * A module for controlling a web crawler through WebSocket messages.
 */
declare const cbcrawler: {
    /**
     * Starts the crawler.
     */
    start: () => void;
    /**
     * Takes a screenshot using the crawler.
     */
    screenshot: () => void;
    /**
     * Directs the crawler to navigate to a specified URL.
     * @param url - The URL for the crawler to navigate to.
     */
    goToPage: (url: string) => void;
    /**
     * Scrolls the crawler in a specified direction.
     * @param direction - The direction to scroll ('up', 'down', 'left', 'right').
     */
    scroll: (direction: string) => void;
    /**
     * Simulates a click event on an element with the specified ID.
     * @param id - The ID of the element to be clicked.
     * @returns {Promise<any>} A promise that resolves when the click action is complete.
     */
    click: (id: string) => Promise<unknown>;
    /**
     * Types the provided text into an element with the specified ID.
     * @param id - The ID of the element where text will be typed.
     * @param text - The text to type into the element.
     * @returns {Promise<any>} A promise that resolves when the type action is complete.
     */
    type: (id: string, text: string) => Promise<unknown>;
    /**
     * Simulates the Enter key press using the crawler.
     */
    enter: () => void;
    /**
     * Initiates a crawl process.
     */
    crawl: (query: string) => Promise<unknown>;
};
export default cbcrawler;
