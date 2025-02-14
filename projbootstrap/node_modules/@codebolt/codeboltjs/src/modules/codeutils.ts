import cbws from './websocket';
import * as fs from 'fs';
import path from 'path';
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';
import typescript from "tree-sitter-typescript"; // TypeScript and TSX grammar

import { GetJsTreeResponse, MatchProblemResponse, GetMatcherListTreeResponse, getMatchDetail } from '@codebolt/types';

/**
 * A utility module for working with code.
 */
const cbcodeutils = {

    /**
     * Retrieves a JavaScript tree structure for a given file path.
     * @param {string} filePath - The path of the file to retrieve the JS tree for.
     * @returns {Promise<GetJsTreeResponse>} A promise that resolves with the JS tree response.
     */
    getJsTree: (filePath?: string) => {
        return new Promise(async (resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getProjectPath"
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getProjectPathResponse") {
                    // resolve(response);
                    try {
                        let pathInput = filePath || response.projectPath;
                        let parser = new Parser();
                        // Initialize the parser with the JavaScript language
                        parser.setLanguage(JavaScript);
                        const trees = [];
                        const functionNodes = [];
                        const processDirectory = (directory: any) => {
                            // Read all files in the directory
                            const files = fs.readdirSync(directory, { withFileTypes: true });

                            files.forEach(file => {
                                if (file.isDirectory()) {
                                    if (file.name !== 'node_modules') { // Ignore node_modules directory
                                        processDirectory(path.join(directory, file.name)); // Recursive call for subdirectories
                                    }
                                } else if (path.extname(file.name) === '.js') {
                                    const code = fs.readFileSync(path.join(directory, file.name), 'utf-8');
                                    console.log(code);
                                    let tree: any = parser.parse(code);
                                    tree.rootNode.path = path.join(directory, file.name); // Set file path for t
                                    trees.push(tree);
                                }
                            });
                        };

                        if (fs.lstatSync(pathInput).isDirectory()) {
                            processDirectory(pathInput);
                        } else if (path.extname(pathInput) === '.js') {
                            // Read a single JavaScript file
                            const code = fs.readFileSync(pathInput, 'utf-8');
                            let tree: any = parser.parse(code);
                            tree.rootNode.path = pathInput; // Set file path for t

                            trees.push(tree);
                        }

                        resolve({ event: 'GetJsTreeResponse', payload: trees }); // Return an array of abstract syntax trees (ASTs)
                    } catch (error) {
                        console.error('An error occurred:', error);
                        return { event: 'GetJsTreeResponse', payload: null }; // Return null in case of error
                    }
                }
            });


        });
        // return new Promise(async (resolve, reject) => {
        //     cbws.getWebsocket.send(JSON.stringify({
        //         "type": "codeEvent",
        //         "action": "getJsTree",
        //         payload: {
        //             filePath
        //         }
        //     }));
        //     cbws.getWebsocket.on('message', (data: string) => {
        //         const response = JSON.parse(data);
        //         if (response.type === "getJsTreeResponse") {
        //             resolve(response); // Resolve the Promise with the response data
        //         }
        //     });
        // });
    },

    /**
     * Retrieves all files as Markdown.
     * @returns {Promise<string>} A promise that resolves with the Markdown content of all files.
     */
    getAllFilesAsMarkDown: (): Promise<string> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "getAllFilesMarkdown"
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getAllFilesMarkdownResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },

    /**
     * Performs a matching operation based on the provided matcher definition and problem patterns.
     * @param {object} matcherDefinition - The definition of the matcher.
     * @param {Array} problemPatterns - The patterns to match against.
     * @param {Array} problems - The list of problems.
     * @returns {Promise<MatchProblemResponse>} A promise that resolves with the matching problem response.
     */
    performMatch: (matcherDefinition: object, problemPatterns: any[], problems: any[]): Promise<MatchProblemResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "performMatch",
                payload: {
                    matcherDefinition,
                    problemPatterns,
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getgetJsTreeResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },

    /**
     * Retrieves the list of matchers.
     * @returns {Promise<GetMatcherListTreeResponse>} A promise that resolves with the list of matchers response.
     */
    getMatcherList: (): Promise<GetMatcherListTreeResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "getMatcherList",
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getMatcherListTreeResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    },

    /**
     * Retrieves details of a match.
     * @param {string} matcher - The matcher to retrieve details for.
     * @returns {Promise<getMatchDetail>} A promise that resolves with the match detail response.
     */
    matchDetail: (matcher: string): Promise<getMatchDetail> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "getMatchDetail",
                payload: {
                    match: matcher
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "matchDetailTreeResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    }

};

export default cbcodeutils;
