import cbws from './modules/websocket';
import cbfs from './modules/fs';
import cbllm from './modules/llm';
import cbterminal from './modules/terminal';
import cbbrowser from './modules/browser';
import cbchat from './modules/chat';
import cbcodeutils from './modules/codeutils';
import cbdocutils from './modules/docutils';
import cbcrawler from './modules/crawler';
import cbsearch from './modules/search';
import cbknowledge from './modules/knowledge';
import cbrag from './modules/rag';
import cbcodeparsers from './modules/codeparsers';
import cboutputparsers from './modules/outputparsers';
import cbproject from './modules/project';
import git from './modules/git';
import dbmemory from './modules/dbmemory';
import cbstate from './modules/state';
import task from './modules/task';
import vectorDB from './modules/vectordb';
import debug from './modules/debug'
import tokenizer from './modules/tokenizer'
import WebSocket from 'ws';
import { EventEmitter } from 'events';
import {chatSummary} from './modules/history'
import codeboltMCP from './modules/mcp';
import cbagent from './modules/agent';



/**
 * @class Codebolt
 * @description This class provides a unified interface to interact with various modules.
 */
class Codebolt  { // Extend EventEmitter

    /**
     * @constructor
     * @description Initializes the websocket connection.
     */
    constructor() {

        this.websocket = cbws.getWebsocket;
    }
    
    /**
     * @method waitForConnection
     * @description Waits for the WebSocket connection to open.
     * @returns {Promise<void>} A promise that resolves when the WebSocket connection is open.
     */
    async waitForConnection() {
        return new Promise<void>((resolve, reject) => {
            if (!this.websocket) {
                reject(new Error('WebSocket is not initialized'));
                return;
            }

            if (this.websocket.readyState === WebSocket.OPEN) {
                resolve();
                return;
            }

            this.websocket.addEventListener('open', () => {
                resolve();
            });

            this.websocket.addEventListener('error', (error) => {
                reject(error);
            });

        });
    }

    websocket: WebSocket | null = null;
    fs = cbfs;
    git = git;
    llm = cbllm;
    browser = cbbrowser;
    chat = cbchat;
    terminal = cbterminal;
    codeutils = cbcodeutils;
    docutils = cbdocutils;
    crawler = cbcrawler;
    search = cbsearch;
    knowledge = cbknowledge;
    rag = cbrag;
    codeparsers = cbcodeparsers;
    outputparsers = cboutputparsers;
    project = cbproject;
    dbmemory = dbmemory;
    cbstate = cbstate;
    taskplaner = task;
    vectordb = vectorDB;
    debug = debug;
    tokenizer = tokenizer;
    chatSummary=chatSummary;
    MCP = codeboltMCP;
    AGENT = cbagent;
}

export default new Codebolt();

// module.exports = new Codebolt();