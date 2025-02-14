"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
// import {AddTaskResponse,GetTasksResponse,UpdateTasksResponse } from '@codebolt/types';
/**
 * Manages task operations via WebSocket communication.
 */
const taskplaner = {
    /**
     * Adds a task using a WebSocket message.
     * @param {string} task - The task to be added.
     * @returns {Promise<AddTaskResponse>} A promise that resolves with the response from the add task event.
     */
    addTask: async (task) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "taskEvent",
                "action": "addTask",
                message: {
                    "task": task
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "addTaskResponse") {
                    resolve(response); // Resolve the promise with the response data from adding the task
                }
            });
        });
    },
    /**
     * Retrieves all tasks using a WebSocket message.
     * @returns {Promise<GetTasksResponse>} A promise that resolves with the response from the get tasks event.
     */
    getTasks: async () => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "taskEvent",
                "action": "getTasks"
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "getTasksResponse") {
                    resolve(response); // Resolve the promise with the response data from retrieving tasks
                }
            });
        });
    },
    /**
     * Updates an existing task using a WebSocket message.
     * @param {string} task - The updated task information.
     * @returns {Promise<UpdateTasksResponse>} A promise that resolves with the response from the update task event.
     */
    updateTask: async (task) => {
        return new Promise((resolve, reject) => {
            websocket_1.default.getWebsocket.send(JSON.stringify({
                "type": "taskEvent",
                "action": "updateTask",
                message: {
                    "task": task
                }
            }));
            websocket_1.default.getWebsocket.on('message', (data) => {
                const response = JSON.parse(data);
                if (response.type === "updateTaskResponse") {
                    resolve(response); // Resolve the promise with the response data from updating the task
                }
            });
        });
    }
};
exports.default = taskplaner;
