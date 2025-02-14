export interface GetAgentStateResponse {
    type: 'getAgentStateResponse';
    payload: { [key: string]: any } | null;
}

export interface AddToAgentStateResponse {
    type: 'addToAgentStateResponse';
    payload: { success: boolean };
}
export interface ApplicationState {
    agentState: {
        userName: string;
        defaultLLM: string;
    };
    appState: {
        defaultApplicationLLM: string;
        currentActiveProjectPath: string;
    };
    projectState: {
        token_used: string,
        chats: [],
        projectPath: string,
        projectName: string
    };
}
