import cbws from './websocket';

export enum logType {
    info = "info",
    error = "error",
    warning = "warning"
}


export const chatSummary = {

    summarizeAll: (): Promise<{
        role: string;
        content: string;
    }[]> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "chatSummaryEvent",
                "action": "summarizeAll",

            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getSummarizeAllResponse") {
                    resolve(response.payload); // Resolve the Promise with the response data
                }
            })
        })


    },
    summarize: (messages: {
        role: string;
        content: string;
    }[], depth: number): Promise<{
        role: string;
        content: string;
    }[]> => {
        return new Promise((resolve, reject) => {
            cbws.getWebsocket.send(JSON.stringify({
                "type": "chatSummaryEvent",
                "action": "summarize",
                messages,
                depth
            }));
            cbws.getWebsocket.on('message', (data: string) => {
                const response = JSON.parse(data);
                if (response.type === "getSummarizeResponse") {
                    resolve(response.payload); // Resolve the Promise with the response data
                }
            })
        })

    }
}


export default chatSummary;



