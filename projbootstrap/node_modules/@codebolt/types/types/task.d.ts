export interface AddTaskResponse {
  type: 'addTaskResponse';
  success: boolean;
}

export interface GetTasksResponse {
  type: 'getTasksResponse';
  tasks: string[]; 
}

export interface UpdateTasksResponse {
    type: 'updateTasksResponse';
    success: boolean;
  }
