/**
 * A service for interacting with Git operations via WebSocket messages.
 */
declare const gitService: {
    /**
     * Initializes a new Git repository at the given path.
     * @param {string} path - The file system path where the Git repository should be initialized.
     * @returns {Promise<any>} A promise that resolves with the response from the init event.
     */
    init: (path: string) => Promise<any>;
    /**
     * Clones a Git repository from the given URL to the specified path.
     * @param {string} url - The URL of the Git repository to clone.
     * @param {string} path - The file system path where the repository should be cloned to.
     * @returns {Promise<any>} A promise that resolves with the response from the clone event.
     */
    clone: (url: string, path: string) => Promise<any>;
    /**
     * Pulls the latest changes from the remote repository to the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the pull event.
     */
    pull: (path: string) => Promise<any>;
    /**
     * Pushes local repository changes to the remote repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the push event.
     */
    push: (path: string) => Promise<any>;
    /**
     * Retrieves the status of the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the status event.
     */
    status: (path: string) => Promise<any>;
    /**
     * Adds changes in the local repository to the staging area at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the add event.
     */
    add: (path: string) => Promise<any>;
    /**
     * Commits the staged changes in the local repository with the given commit message.
     * @param {string} message - The commit message to use for the commit.
     * @returns {Promise<any>} A promise that resolves with the response from the commit event.
     */
    commit: (message: string) => Promise<any>;
    /**
     * Checks out a branch or commit in the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @param {string} branch - The name of the branch or commit to check out.
     * @returns {Promise<any>} A promise that resolves with the response from the checkout event.
     */
    checkout: (path: string, branch: string) => Promise<any>;
    /**
     * Creates a new branch in the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @param {string} branch - The name of the new branch to create.
     * @returns {Promise<any>} A promise that resolves with the response from the branch event.
     */
    branch: (path: string, branch: string) => Promise<any>;
    /**
     * Retrieves the commit logs for the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the logs event.
     */
    logs: (path: string) => Promise<any>;
    /**
     * Retrieves the diff of changes for a specific commit in the local repository.
     * @param {string} commitHash - The hash of the commit to retrieve the diff for.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the diff event.
     */
    diff: (commitHash: string, path: string) => Promise<any>;
};
export default gitService;
