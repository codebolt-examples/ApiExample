import cbws from './websocket';

/**
 * A service for interacting with Git operations via WebSocket messages.
 */
const gitService = {
    /**
     * Initializes a new Git repository at the given path.
     * @param {string} path - The file system path where the Git repository should be initialized.
     * @returns {Promise<any>} A promise that resolves with the response from the init event.
     */
    init: async (path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Init",
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "InitResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Clones a Git repository from the given URL to the specified path.
     * @param {string} url - The URL of the Git repository to clone.
     * @param {string} path - The file system path where the repository should be cloned to.
     * @returns {Promise<any>} A promise that resolves with the response from the clone event.
     */
    clone: async (url: string, path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Clone",
                "url": url,
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "CloneResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Pulls the latest changes from the remote repository to the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the pull event.
     */
    pull: async (path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Pull",
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "PullResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Pushes local repository changes to the remote repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the push event.
     */
    push: async (path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Push",
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "PushResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves the status of the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the status event.
     */
    status: async (path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Status",
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "StatusResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Adds changes in the local repository to the staging area at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the add event.
     */
    add: async (path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Add",
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "AddResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Commits the staged changes in the local repository with the given commit message.
     * @param {string} message - The commit message to use for the commit.
     * @returns {Promise<any>} A promise that resolves with the response from the commit event.
     */
    commit: async (message: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Commit",
                "message": message
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "gitCommitResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Checks out a branch or commit in the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @param {string} branch - The name of the branch or commit to check out.
     * @returns {Promise<any>} A promise that resolves with the response from the checkout event.
     */
    checkout: async (path: string, branch: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Checkout",
                "path": path,
                "branch": branch
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "CheckoutResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Creates a new branch in the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @param {string} branch - The name of the new branch to create.
     * @returns {Promise<any>} A promise that resolves with the response from the branch event.
     */
    branch: async (path: string, branch: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Branch",
                "path": path,
                "branch": branch
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "BranchResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves the commit logs for the local repository at the given path.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the logs event.
     */
    logs: async (path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Logs",
                "path": path
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "LogsResponse") {
                    resolve(response);
                }
            });
        });
    },
    /**
     * Retrieves the diff of changes for a specific commit in the local repository.
     * @param {string} commitHash - The hash of the commit to retrieve the diff for.
     * @param {string} path - The file system path of the local Git repository.
     * @returns {Promise<any>} A promise that resolves with the response from the diff event.
     */
    diff: async (commitHash: string, path: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "gitEvent",
                "action": "Diff",
                "path": path,
                "commitHash": commitHash
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "DiffResponse") {
                    resolve(response);
                }
            });
        });
    }
};

export default gitService;
