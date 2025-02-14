"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
/**
 * A module for interacting with project settings and paths.
 */
const cbproject = {
    /**
     * Placeholder for a method to get project settings.
     * Currently, this method does not perform any operations.
     * @param {any} output - The output where project settings would be stored.
     */
    getProjectSettings: (output) => {
        // Implementation for getting project settings will be added here
    },
    /**
     * Retrieves the path of the current project.
     * @returns {Promise<GetProjectPathResponse>} A promise that resolves with the project path response.
     */
    getProjectPath: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getProjectPath"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getProjectPathResponse") {
                    resolve(response);
                }
            });
        });
    },
    getRepoMap: (message) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getRepoMap",
                message
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getRepoMapResponse") {
                    resolve(response);
                }
            });
        });
    },
    runProject: () => {
        websocket_1.default.getWebsocket.send(JSON.stringify({
            "type": "runProject"
        }));
    },
    getEditorFileStatus: () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getEditorFileStatus",
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getEditorFileStatusResponse") {
                    resolve(response);
                }
            });
        });
    }
};
exports.default = cbproject;
