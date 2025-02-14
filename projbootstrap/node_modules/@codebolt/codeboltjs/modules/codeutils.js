"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const tree_sitter_1 = __importDefault(require("tree-sitter"));
const tree_sitter_javascript_1 = __importDefault(require("tree-sitter-javascript"));
/**
 * A utility module for working with code.
 */
const cbcodeutils = {
    /**
     * Retrieves a JavaScript tree structure for a given file path.
     * @param {string} filePath - The path of the file to retrieve the JS tree for.
     * @returns {Promise<GetJsTreeResponse>} A promise that resolves with the JS tree response.
     */
    getJsTree: (filePath) => {
        return new Promise(async (resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getProjectPath"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getProjectPathResponse") {
                    // resolve(response);
                    try {
                        let pathInput = filePath || response.projectPath;
                        let parser = new tree_sitter_1.default();
                        // Initialize the parser with the JavaScript language
                        parser.setLanguage(tree_sitter_javascript_1.default);
                        const trees = [];
                        const functionNodes = [];
                        const processDirectory = (directory) => {
                            // Read all files in the directory
                            const files = fs.readdirSync(directory, { withFileTypes: true });
                            files.forEach(file => {
                                if (file.isDirectory()) {
                                    if (file.name !== 'node_modules') { // Ignore node_modules directory
                                        processDirectory(path_1.default.join(directory, file.name)); // Recursive call for subdirectories
                                    }
                                }
                                else if (path_1.default.extname(file.name) === '.js') {
                                    const code = fs.readFileSync(path_1.default.join(directory, file.name), 'utf-8');
                                    console.log(code);
                                    let tree = parser.parse(code);
                                    tree.rootNode.path = path_1.default.join(directory, file.name); // Set file path for t
                                    trees.push(tree);
                                }
                            });
                        };
                        if (fs.lstatSync(pathInput).isDirectory()) {
                            processDirectory(pathInput);
                        }
                        else if (path_1.default.extname(pathInput) === '.js') {
                            // Read a single JavaScript file
                            const code = fs.readFileSync(pathInput, 'utf-8');
                            let tree = parser.parse(code);
                            tree.rootNode.path = pathInput; // Set file path for t
                            trees.push(tree);
                        }
                        resolve({ event: 'GetJsTreeResponse', payload: trees }); // Return an array of abstract syntax trees (ASTs)
                    }
                    catch (error) {
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
    getAllFilesAsMarkDown: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "getAllFilesMarkdown"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
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
    performMatch: (matcherDefinition, problemPatterns, problems) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "performMatch",
                payload: {
                    matcherDefinition,
                    problemPatterns,
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
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
    getMatcherList: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "getMatcherList",
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
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
    matchDetail: (matcher) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "codeEvent",
                "action": "getMatchDetail",
                payload: {
                    match: matcher
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "matchDetailTreeResponse") {
                    resolve(response); // Resolve the Promise with the response data
                }
            });
        });
    }
};
exports.default = cbcodeutils;
