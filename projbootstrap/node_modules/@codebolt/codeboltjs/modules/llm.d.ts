import { LLMResponse } from '@codebolt/types';
/**
 * A module for interacting with language learning models (LLMs) via WebSocket.
 */
declare const cbllm: {
    /**
     * Sends an inference request to the LLM and returns the model's response.
     * The model is selected based on the provided `llmrole`. If the specific model
     * for the role is not found, it falls back to the default model for the current agent,
     * and ultimately to the default application-wide LLM if necessary.
     *
     * @param {string} message - The input message or prompt to be sent to the LLM.
     * @param {string} llmrole - The role of the LLM to determine which model to use.
     * @returns {Promise<LLMResponse>} A promise that resolves with the LLM's response.
     */
    inference: (message: string, llmrole: string) => Promise<LLMResponse>;
};
export default cbllm;
