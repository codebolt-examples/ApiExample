import { GetProjectPathResponse } from '@codebolt/types';
/**
 * A module for interacting with project settings and paths.
 */
declare const cbproject: {
    /**
     * Placeholder for a method to get project settings.
     * Currently, this method does not perform any operations.
     * @param {any} output - The output where project settings would be stored.
     */
    getProjectSettings: (output: any) => void;
    /**
     * Retrieves the path of the current project.
     * @returns {Promise<GetProjectPathResponse>} A promise that resolves with the project path response.
     */
    getProjectPath: () => Promise<GetProjectPathResponse>;
    getRepoMap: (message: any) => Promise<GetProjectPathResponse>;
    runProject: () => void;
    getEditorFileStatus: () => Promise<unknown>;
};
export default cbproject;
