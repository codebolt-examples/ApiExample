import cbws from './websocket';
import { GetProjectPathResponse } from '@codebolt/types';
/**
 * A module for interacting with project settings and paths.
 */
const cbproject = {
    /**
     * Placeholder for a method to get project settings.
     * Currently, this method does not perform any operations.
     * @param {any} output - The output where project settings would be stored.
     */
    getProjectSettings: (output: any) => {
        // Implementation for getting project settings will be added here
    },
    /**
     * Retrieves the path of the current project.
     * @returns {Promise<GetProjectPathResponse>} A promise that resolves with the project path response.
     */
    getProjectPath: (): Promise<GetProjectPathResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getProjectPath"
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getProjectPathResponse") {
                    resolve(response);
                }
            });
        });
    },
    getRepoMap: (message: any): Promise<GetProjectPathResponse> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getRepoMap",
                message
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getRepoMapResponse") {
                    resolve(response);
                }
            });
        });
    },
    runProject: () => {
        cbws.getWebsocket.send(JSON.stringify({
            "type": "runProject"
        }));
    },
    getEditorFileStatus:()=>{
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "settingEvent",
                "action": "getEditorFileStatus",
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getEditorFileStatusResponse") {
                    resolve(response);
                }
            });
        }); 
    }
};
export default cbproject