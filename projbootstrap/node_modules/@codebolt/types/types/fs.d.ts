export interface CreateFileResponse {
  type: 'createFileResponse';
  success: boolean;
  message: string;
  fileName?: string;
  error?: string;
}

export interface CreateFolderResponse {
  type: 'createFolderResponse';
  success: boolean;
  message: string;
  folderName?: string;
  error?: string;
}

export interface ReadFileResponse {
  type: 'readFileResponse';
  success: boolean;
  message: string;
  filename?: string;
  content?: string;
  error?: string;
}

export interface UpdateFileResponse {
  type: 'updateFileResponse';
  success: boolean;
  message: string;
  newContent?: string;
  error?: string;
}

export interface DeleteFileResponse {
  type: 'deleteFileResponse';
  success: boolean;
  message: string;
  filename?: string;
  error?: string;
}

export interface DeleteFolderResponse {
  type: 'deleteFolderResponse';
  success: boolean;
  message: string;
  foldername?: string;
  error?: string;
}
