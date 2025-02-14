export interface GetProjectPathResponse {
  type: 'getProjectPathResponse';
  success: boolean;
  message: string;
  projectPath: string;
}
