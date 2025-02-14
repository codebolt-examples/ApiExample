export interface LLMResponse {
    type: string;
    message:   string;
    token:Usage
  }
  
 export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }


