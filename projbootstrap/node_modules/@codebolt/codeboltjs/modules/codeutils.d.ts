import { MatchProblemResponse, GetMatcherListTreeResponse, getMatchDetail } from '@codebolt/types';
/**
 * A utility module for working with code.
 */
declare const cbcodeutils: {
    /**
     * Retrieves a JavaScript tree structure for a given file path.
     * @param {string} filePath - The path of the file to retrieve the JS tree for.
     * @returns {Promise<GetJsTreeResponse>} A promise that resolves with the JS tree response.
     */
    getJsTree: (filePath?: string) => Promise<unknown>;
    /**
     * Retrieves all files as Markdown.
     * @returns {Promise<string>} A promise that resolves with the Markdown content of all files.
     */
    getAllFilesAsMarkDown: () => Promise<string>;
    /**
     * Performs a matching operation based on the provided matcher definition and problem patterns.
     * @param {object} matcherDefinition - The definition of the matcher.
     * @param {Array} problemPatterns - The patterns to match against.
     * @param {Array} problems - The list of problems.
     * @returns {Promise<MatchProblemResponse>} A promise that resolves with the matching problem response.
     */
    performMatch: (matcherDefinition: object, problemPatterns: any[], problems: any[]) => Promise<MatchProblemResponse>;
    /**
     * Retrieves the list of matchers.
     * @returns {Promise<GetMatcherListTreeResponse>} A promise that resolves with the list of matchers response.
     */
    getMatcherList: () => Promise<GetMatcherListTreeResponse>;
    /**
     * Retrieves details of a match.
     * @param {string} matcher - The matcher to retrieve details for.
     * @returns {Promise<getMatchDetail>} A promise that resolves with the match detail response.
     */
    matchDetail: (matcher: string) => Promise<getMatchDetail>;
};
export default cbcodeutils;
