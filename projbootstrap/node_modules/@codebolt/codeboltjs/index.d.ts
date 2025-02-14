/// <reference types="node" />
import WebSocket from 'ws';
import { EventEmitter } from 'events';
/**
 * @class Codebolt
 * @description This class provides a unified interface to interact with various modules.
 */
declare class Codebolt {
    /**
     * @constructor
     * @description Initializes the websocket connection.
     */
    constructor();
    /**
     * @method waitForConnection
     * @description Waits for the WebSocket connection to open.
     * @returns {Promise<void>} A promise that resolves when the WebSocket connection is open.
     */
    waitForConnection(): Promise<void>;
    websocket: WebSocket | null;
    fs: {
        createFile: (fileName: string, source: string, filePath: string) => Promise<import("@codebolt/types").CreateFileResponse>;
        createFolder: (folderName: string, folderPath: string) => Promise<import("@codebolt/types").CreateFolderResponse>;
        readFile: (filePath: string) => Promise<import("@codebolt/types").ReadFileResponse>;
        updateFile: (filename: string, filePath: string, newContent: string) => Promise<import("@codebolt/types").UpdateFileResponse>;
        deleteFile: (filename: string, filePath: string) => Promise<import("@codebolt/types").DeleteFileResponse>;
        deleteFolder: (foldername: string, folderpath: string) => Promise<import("@codebolt/types").DeleteFolderResponse>;
        listFile: (folderPath: string, isRecursive?: boolean) => Promise<unknown>;
        listCodeDefinitionNames: (path: string) => Promise<{
            success: boolean;
            result: any;
        }>;
        searchFiles: (path: string, regex: string, filePattern: string) => Promise<{
            success: boolean;
            result: any;
        }>;
        writeToFile: (relPath: string, newContent: string) => Promise<unknown>;
    };
    git: {
        init: (path: string) => Promise<any>;
        clone: (url: string, path: string) => Promise<any>;
        pull: (path: string) => Promise<any>;
        push: (path: string) => Promise<any>;
        status: (path: string) => Promise<any>;
        add: (path: string) => Promise<any>;
        commit: (message: string) => Promise<any>;
        checkout: (path: string, branch: string) => Promise<any>;
        branch: (path: string, branch: string) => Promise<any>;
        logs: (path: string) => Promise<any>;
        diff: (commitHash: string, path: string) => Promise<any>;
    };
    llm: {
        inference: (message: string, llmrole: string) => Promise<import("@codebolt/types").LLMResponse>;
    };
    browser: {
        newPage: () => Promise<unknown>;
        getUrl: () => Promise<import("@codebolt/types").UrlResponse>;
        goToPage: (url: string) => Promise<import("@codebolt/types").GoToPageResponse>;
        screenshot: () => Promise<unknown>;
        getHTML: () => Promise<import("@codebolt/types").HtmlReceived>;
        getMarkdown: () => Promise<import("@codebolt/types").GetMarkdownResponse>;
        getPDF: () => void;
        pdfToText: () => void;
        getContent: () => Promise<import("@codebolt/types").GetContentResponse>;
        getSnapShot: () => Promise<any>;
        getBrowserInfo: () => Promise<any>;
        extractText: () => Promise<import("@codebolt/types").ExtractTextResponse>;
        close: () => void;
        scroll: (direction: string, pixels: string) => Promise<unknown>;
        type: (elementid: string, text: string) => Promise<unknown>;
        click: (elementid: string) => Promise<unknown>;
        enter: () => Promise<unknown>;
        search: (elementid: string, query: string) => Promise<unknown>;
    };
    chat: {
        getChatHistory: () => Promise<import("@codebolt/types").ChatMessage[]>;
        onActionMessage: () => {
            [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: string | symbol, ...args: any[]): void;
            addListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            on<K_2>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            once<K_3>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            removeListener<K_4>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            off<K_5>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            removeAllListeners(eventName?: string | symbol | undefined): any;
            setMaxListeners(n: number): any;
            getMaxListeners(): number;
            listeners<K_6>(eventName: string | symbol): Function[];
            rawListeners<K_7>(eventName: string | symbol): Function[];
            emit<K_8>(eventName: string | symbol, ...args: any[]): boolean;
            listenerCount<K_9>(eventName: string | symbol, listener?: Function | undefined): number;
            prependListener<K_10>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            prependOnceListener<K_11>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            eventNames(): (string | symbol)[];
        } | undefined;
        sendMessage: (message: string, payload: any) => void;
        waitforReply: (message: string) => Promise<import("@codebolt/types").UserMessage>;
        processStarted: () => {
            event: {
                [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: string | symbol, ...args: any[]): void;
                addListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                on<K_2>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                once<K_3>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                removeListener<K_4>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                off<K_5>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                removeAllListeners(eventName?: string | symbol | undefined): any;
                setMaxListeners(n: number): any;
                getMaxListeners(): number;
                listeners<K_6>(eventName: string | symbol): Function[];
                rawListeners<K_7>(eventName: string | symbol): Function[];
                emit<K_8>(eventName: string | symbol, ...args: any[]): boolean;
                listenerCount<K_9>(eventName: string | symbol, listener?: Function | undefined): number;
                prependListener<K_10>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                prependOnceListener<K_11>(eventName: string | symbol, listener: (...args: any[]) => void): any;
                eventNames(): (string | symbol)[];
            };
            stopProcess: () => void;
        };
        stopProcess: () => void;
        processFinished: () => void;
        sendConfirmationRequest: (confirmationMessage: string, buttons?: string[], withFeedback?: boolean) => Promise<string>;
        askQuestion: (question: string, buttons?: string[], withFeedback?: boolean) => Promise<string>;
        sendNotificationEvent: (notificationMessage: string, type: "debug" | "git" | "planner" | "browser" | "editor" | "terminal" | "preview") => void;
    };
    terminal: {
        eventEmitter: {
            [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: string | symbol, ...args: any[]): void;
            addListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            on<K_2>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            once<K_3>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            removeListener<K_4>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            off<K_5>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            removeAllListeners(eventName?: string | symbol | undefined): any;
            setMaxListeners(n: number): any;
            getMaxListeners(): number;
            listeners<K_6>(eventName: string | symbol): Function[];
            rawListeners<K_7>(eventName: string | symbol): Function[];
            emit<K_8>(eventName: string | symbol, ...args: any[]): boolean;
            listenerCount<K_9>(eventName: string | symbol, listener?: Function | undefined): number;
            prependListener<K_10>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            prependOnceListener<K_11>(eventName: string | symbol, listener: (...args: any[]) => void): any;
            eventNames(): (string | symbol)[];
        };
        executeCommand: (command: string, returnEmptyStringOnSuccess?: boolean) => Promise<unknown>;
        executeCommandRunUntilError: (command: string, executeInMain?: boolean) => Promise<import("@codebolt/types").CommandError>;
        sendManualInterrupt(): Promise<import("@codebolt/types").TerminalInterruptResponse>;
        executeCommandWithStream(command: string, executeInMain?: boolean): EventEmitter<[never]>;
    };
    codeutils: {
        getJsTree: (filePath?: string | undefined) => Promise<unknown>;
        getAllFilesAsMarkDown: () => Promise<string>;
        performMatch: (matcherDefinition: object, problemPatterns: any[], problems: any[]) => Promise<import("@codebolt/types").MatchProblemResponse>;
        getMatcherList: () => Promise<import("@codebolt/types").GetMatcherListTreeResponse>;
        matchDetail: (matcher: string) => Promise<import("@codebolt/types").getMatchDetail>;
    };
    docutils: {
        pdf_to_text: (pdf_path: any) => Promise<string>;
    };
    crawler: {
        start: () => void;
        screenshot: () => void;
        goToPage: (url: string) => void;
        scroll: (direction: string) => void;
        click: (id: string) => Promise<unknown>;
        type: (id: string, text: string) => Promise<unknown>;
        enter: () => void;
        crawl: (query: string) => Promise<unknown>;
    };
    search: {
        init: (engine?: string) => void;
        search: (query: string) => Promise<string>;
        get_first_link: (query: string) => Promise<string>;
    };
    knowledge: {};
    rag: {
        init: () => void;
        add_file: (filename: string, file_path: string) => void;
        retrieve_related_knowledge: (query: string, filename: string) => void;
    };
    codeparsers: {
        getClassesInFile: (file: any) => void;
        getFunctionsinClass: (file: any, className: any) => void;
        getAstTreeInFile: (file: any, className: any) => void;
    };
    outputparsers: {
        init: (output: any) => void;
        parseErrors: (output: any) => string[];
        parseWarnings: (output: any) => string[];
    };
    project: {
        getProjectSettings: (output: any) => void;
        getProjectPath: () => Promise<import("@codebolt/types").GetProjectPathResponse>;
        getRepoMap: (message: any) => Promise<import("@codebolt/types").GetProjectPathResponse>;
        runProject: () => void;
        getEditorFileStatus: () => Promise<unknown>;
    };
    dbmemory: {
        addKnowledge: (key: string, value: any) => Promise<import("@codebolt/types").MemorySetResponse>;
        getKnowledge: (key: string) => Promise<import("@codebolt/types").MemoryGetResponse>;
    };
    cbstate: {
        getApplicationState: () => Promise<import("@codebolt/types").ApplicationState>;
        addToAgentState: (key: string, value: string) => Promise<import("@codebolt/types").AddToAgentStateResponse>;
        getAgentState: () => Promise<import("@codebolt/types").GetAgentStateResponse>;
        getProjectState: () => Promise<any>;
        updateProjectState: (key: string, value: any) => Promise<any>;
    };
    taskplaner: {
        addTask: (task: string) => Promise<any>;
        getTasks: () => Promise<any>;
        updateTask: (task: string) => Promise<any>;
    };
    vectordb: {
        getVector: (key: string) => Promise<import("@codebolt/types").GetVectorResponse>;
        addVectorItem: (item: any) => Promise<import("@codebolt/types").AddVectorItemResponse>;
        queryVectorItem: (key: string) => Promise<import("@codebolt/types").QueryVectorItemResponse>;
        queryVectorItems: (items: [], dbPath: string) => Promise<import("@codebolt/types").QueryVectorItemResponse>;
    };
    debug: {
        debug: (log: string, type: import("./modules/debug").logType) => Promise<import("@codebolt/types").DebugAddLogResponse>;
        openDebugBrowser: (url: string, port: number) => Promise<import("@codebolt/types").OpenDebugBrowserResponse>;
    };
    tokenizer: {
        addToken: (key: string) => Promise<import("@codebolt/types").AddTokenResponse>;
        getToken: (key: string) => Promise<import("@codebolt/types").GetTokenResponse>;
    };
    chatSummary: {
        summarizeAll: () => Promise<{
            role: string;
            content: string;
        }[]>;
        summarize: (messages: {
            role: string;
            content: string;
        }[], depth: number) => Promise<{
            role: string;
            content: string;
        }[]>;
    };
    MCP: {
        executeTool: (toolName: string, params: any, mcpServer?: string | undefined) => Promise<any>;
        getMcpTools: (tools: string[]) => Promise<any>;
        getAllMCPTools: (mpcName: string) => Promise<any>;
        getMCPTool: (name: string) => Promise<any>;
        getEnabledMCPS: () => Promise<any>;
    };
    AGENT: {
        getAgent: (task: string) => Promise<any>;
        startAgent: (agentId: string, task: string) => Promise<any>;
    };
}
declare const _default: Codebolt;
export default _default;
