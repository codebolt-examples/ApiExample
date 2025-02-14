/**
 * A module for handling search operations.
 */
declare const cbsearch: {
    /**
     * Initializes the search module with the specified search engine.
     * @param {string} [engine="bing"] - The search engine to use for initializing the module.
     */
    init: (engine?: string) => void;
    /**
     * Performs a search operation for the given query.
     * @param {string} query - The search query.
     * @returns {Promise<string>} A promise that resolves with the search results.
     */
    search: (query: string) => Promise<string>;
    /**
     * Retrieves the first link from the search results for the given query.
     * @param {string} query - The search query.
     * @returns {Promise<string>} A promise that resolves with the first link of the search results.
     */
    get_first_link: (query: string) => Promise<string>;
};
export default cbsearch;
