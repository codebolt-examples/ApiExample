import { GoToPageResponse, UrlResponse, GetMarkdownResponse, HtmlReceived, ExtractTextResponse, GetContentResponse } from '@codebolt/types';
/**
 * A module for interacting with a browser through WebSockets.
 */
declare const cbbrowser: {
    /**
     * Opens a new page in the browser.
     */
    newPage: () => Promise<unknown>;
    /**
     * Retrieves the current URL of the browser's active page.
     * @returns {Promise<UrlResponse>} A promise that resolves with the URL.
     */
    getUrl: () => Promise<UrlResponse>;
    /**
     * Navigates to a specified URL.
     * @param {string} url - The URL to navigate to.
     * @returns {Promise<GoToPageResponse>} A promise that resolves when navigation is complete.
     */
    goToPage: (url: string) => Promise<GoToPageResponse>;
    /**
     * Takes a screenshot of the current page.
     */
    screenshot: () => Promise<unknown>;
    /**
     * Retrieves the HTML content of the current page.
     * @returns {Promise<HtmlReceived>} A promise that resolves with the HTML content.
     */
    getHTML: () => Promise<HtmlReceived>;
    /**
     * Retrieves the Markdown content of the current page.
     * @returns {Promise<GetMarkdownResponse>} A promise that resolves with the Markdown content.
     */
    getMarkdown: () => Promise<GetMarkdownResponse>;
    /**
     * Retrieves the PDF content of the current page.
     *
     */
    getPDF: () => void;
    /**
     * Converts the PDF content of the current page to text.
     */
    pdfToText: () => void;
    /**
     * Retrieves the content of the current page.
     *  @returns {Promise<GetContentResponse>} A promise that resolves with the content.
     */
    getContent: () => Promise<GetContentResponse>;
    /**
     * Retrieves the snapshot of the current page.
     *  @returns {Promise<GetContentResponse>} A promise that resolves with the content.
     */
    getSnapShot: () => Promise<any>;
    /**
     * Retrieves browser info like height width scrollx scrolly of the current page.
     *  @returns {Promise<GetContentResponse>} A promise that resolves with the content.
     */
    getBrowserInfo: () => Promise<any>;
    /**
     * Extracts text from the current page.
     *  @returns {Promise<ExtractTextResponse>} A promise that resolves with the extracted text.
     *
     */
    extractText: () => Promise<ExtractTextResponse>;
    /**
     * Closes the current page.
     */
    close: () => void;
    /**
     * Scrolls the current page in a specified direction by a specified number of pixels.
     * @param {string} direction - The direction to scroll.
     * @param {string} pixels - The number of pixels to scroll.
     * @returns {Promise<any>} A promise that resolves when the scroll action is complete.
     */
    scroll: (direction: string, pixels: string) => Promise<unknown>;
    /**
     * Types text into a specified element on the page.
     * @param {string} elementid - The ID of the element to type into.
     * @param {string} text - The text to type.
     * @returns {Promise<any>} A promise that resolves when the typing action is complete.
     */
    type: (elementid: string, text: string) => Promise<unknown>;
    /**
     * Clicks on a specified element on the page.
     * @param {string} elementid - The ID of the element to click.
     * @returns {Promise<any>} A promise that resolves when the click action is complete.
     */
    click: (elementid: string) => Promise<unknown>;
    /**
     * Simulates the Enter key press on the current page.
     * @returns {Promise<any>} A promise that resolves when the Enter action is complete.
     */
    enter: () => Promise<unknown>;
    /**
     * Performs a search on the current page using a specified query.
     * @param {string} elementid - The ID of the element to perform the search in.
     * @param {string} query - The search query.
     * @returns {Promise<any>} A promise that resolves with the search results.
     */
    search: (elementid: string, query: string) => Promise<unknown>;
};
export default cbbrowser;
/***

start_browser(objective: string, url: string, previous_command: string, browser_content: string) {
    cbbrowser.newPage();
}
 */ 
