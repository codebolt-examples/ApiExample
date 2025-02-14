"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A module for handling search operations.
 */
const cbsearch = {
    /**
     * Initializes the search module with the specified search engine.
     * @param {string} [engine="bing"] - The search engine to use for initializing the module.
     */
    init: (engine = "bing") => {
        console.log("Initializing Search Module with engine: " + engine);
    },
    /**
     * Performs a search operation for the given query.
     * @param {string} query - The search query.
     * @returns {Promise<string>} A promise that resolves with the search results.
     */
    search: async (query) => {
        console.log("Searching for " + query);
        return new Promise((resolve, reject) => {
            resolve("Search Results for " + query);
        });
    },
    /**
     * Retrieves the first link from the search results for the given query.
     * @param {string} query - The search query.
     * @returns {Promise<string>} A promise that resolves with the first link of the search results.
     */
    get_first_link: async (query) => {
        console.log("Getting first link for " + query);
        return new Promise((resolve, reject) => {
            resolve("First Link for " + query);
        });
    }
};
exports.default = cbsearch;
