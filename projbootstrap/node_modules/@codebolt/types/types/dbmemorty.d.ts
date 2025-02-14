export interface MemorySetResponse {
    type: 'memorySetResponse';
    action: 'set';
    key: string;
    value: any;
}

export interface MemoryGetResponse {
    type: 'memoryGetResponse';
    action: 'get';
    key: string;
    value: any;
}
