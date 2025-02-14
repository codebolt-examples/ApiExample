/**
 * Manages task operations via WebSocket communication.
 */
declare const taskplaner: {
    /**
     * Adds a task using a WebSocket message.
     * @param {string} task - The task to be added.
     * @returns {Promise<AddTaskResponse>} A promise that resolves with the response from the add task event.
     */
    addTask: (task: string) => Promise<any>;
    /**
     * Retrieves all tasks using a WebSocket message.
     * @returns {Promise<GetTasksResponse>} A promise that resolves with the response from the get tasks event.
     */
    getTasks: () => Promise<any>;
    /**
     * Updates an existing task using a WebSocket message.
     * @param {string} task - The updated task information.
     * @returns {Promise<UpdateTasksResponse>} A promise that resolves with the response from the update task event.
     */
    updateTask: (task: string) => Promise<any>;
};
export default taskplaner;
