export interface CommandOutput {
  type: 'commandOutput';
  response: string;
}

export interface CommandError {
  type: 'commandError';
  response: string;
}

export interface CommandFinish {
  type: 'commandFinish';
  response: number; 
}

export interface TerminalInterruptResponse {
  type: 'terminalInterruptResponse';
  response: number; 
}

export interface TerminalInterrupted {
  type: 'terminalInterrupted';
  success:boolean
}
