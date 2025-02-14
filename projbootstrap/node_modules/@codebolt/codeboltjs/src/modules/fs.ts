import cbws from './websocket';
import {CreateFileResponse,CreateFolderResponse,ReadFileResponse,UpdateFileResponse,DeleteFileResponse,DeleteFolderResponse} from  '@codebolt/types'
/**
 * @module cbfs
 * @description This module provides functionality to interact with the filesystem.
 */
const cbfs = {
    /**
     * @function createFile
     * @description Creates a new file.
     * @param {string} fileName - The name of the file to create.
     * @param {string} source - The source content to write into the file.
     * @param {string} filePath - The path where the file should be created.
     * @returns {Promise<CreateFileResponse>} A promise that resolves with the server response.
     */
    createFile: (fileName: string, source: string, filePath: string): Promise<CreateFileResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"fsEvent",
                "action": "createFile",
                "message": {
                    fileName,
                    source,
                    filePath
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "createFileResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function createFolder
     * @description Creates a new folder.
     * @param {string} folderName - The name of the folder to create.
     * @param {string} folderPath - The path where the folder should be created.
     * @returns {Promise<CreateFolderResponse>} A promise that resolves with the server response.
     */
    createFolder: (folderName: string, folderPath: string): Promise<CreateFolderResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"fsEvent",
                "action": "createFolder",
                "message": {
                    folderName,
                    folderPath
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "createFolderResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function readFile
     * @description Reads the content of a file.
     * @param {string} filename - The name of the file to read.
     * @param {string} filePath - The path of the file to read.
     * @returns {Promise<ReadFileResponse>} A promise that resolves with the server response.
     */
    readFile: (filePath: string): Promise<ReadFileResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"fsEvent",
                "action": "readFile",
                "message": {
                    filePath
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "readFileResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function updateFile
     * @description Updates the content of a file.
     * @param {string} filename - The name of the file to update.
     * @param {string} filePath - The path of the file to update.
     * @param {string} newContent - The new content to write into the file.
     * @returns {Promise<UpdateFileResponse>} A promise that resolves with the server response.
     */
    updateFile: (filename: string, filePath: string, newContent: string): Promise<UpdateFileResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"fsEvent",
                "action": "updateFile",
                "message": {
                    filename,
                    filePath,
                    newContent
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "commandOutput") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function deleteFile
     * @description Deletes a file.
     * @param {string} filename - The name of the file to delete.
     * @param {string} filePath - The path of the file to delete.
     * @returns {Promise<DeleteFileResponse>} A promise that resolves with the server response.
     */
    deleteFile: (filename: string, filePath: string): Promise<DeleteFileResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"fsEvent",
                "action": "deleteFile",
                "message": {
                    filename,
                    filePath
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "deleteFileResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function deleteFolder
     * @description Deletes a folder.
     * @param {string} foldername - The name of the folder to delete.
     * @param {string} folderpath - The path of the folder to delete.
     * @returns {Promise<DeleteFolderResponse>} A promise that resolves with the server response.
     */
    deleteFolder: (foldername: string, folderpath: string): Promise<DeleteFolderResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type":"fsEvent",
                "action": "deleteFolder",
                "message": {
                    foldername,
                    folderpath
                },
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "deleteFolderResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function listFile
     * @description Lists all files.
     * @returns {Promise<FileListResponse>} A promise that resolves with the list of files.
     */
    listFile: (folderPath:string,isRecursive=false) => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "fsEvent",
                "action": "fileList",
                message:{
                    folderPath,
                    isRecursive
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "fileListResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function listCodeDefinitionNames
     * @description Lists all code definition names in a given path.
     * @param {string} path - The path to search for code definitions.
     * @returns {Promise<{success: boolean, result: any}>} A promise that resolves with the list of code definition names.
     */
    listCodeDefinitionNames: (path: string): Promise<{success: boolean, result: any}> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "fsEvent",
                "action": "listCodeDefinitionNames",
                "message": {
                    path
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "listCodeDefinitionNamesResponse") {
                    resolve(response);
                }
            });
        });
    },

    /**
     * @function searchFiles
     * @description Searches files in a given path using a regex pattern.
     * @param {string} path - The path to search within.
     * @param {string} regex - The regex pattern to search for.
     * @param {string} filePattern - The file pattern to match files.
     * @returns {Promise<{success: boolean, result: any}>} A promise that resolves with the search results.
     */
    searchFiles: (path: string, regex: string, filePattern: string): Promise<{success: boolean, result: any}> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "fsEvent",
                "action": "searchFiles",
                "message": {
                    path,
                    regex,
                    filePattern
                }
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "searchFilesResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * @function writeToFile
     * @description Writes content to a file.
     * @param {string} relPath - The relative path of the file to write to.
     * @param {string} newContent - The new content to write into the file.
     * @returns {Promise<{success: boolean, result: any}>} A promise that resolves with the write operation result.
     */
    writeToFile: (relPath:string, newContent:string) => {
        return new Promise((resolve, reject) => {
             cbws.getWebsocket.send(JSON.stringify({
                "type": "fsEvent",
                "action": "writeToFile",
                "message": {
                    relPath,
                    newContent
                }
            }));
             cbws.getWebsocket.on('message', (data:string) => {
                const response = JSON.parse(data);
                if (response.type === "writeToFileResponse") {
                    resolve(response);
                }
            });
        });
    },
  
};

export default cbfs;
