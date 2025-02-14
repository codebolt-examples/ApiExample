export declare enum logType {
    info = "info",
    error = "error",
    warning = "warning"
}
export declare const chatSummary: {
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
export default chatSummary;
