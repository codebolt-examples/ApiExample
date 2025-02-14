/**
 * Encapsulates task instructions and their related metadata.
 * Handles loading and processing of task instructions from YAML files.
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

class TaskInstruction {
    /**
     * Creates a TaskInstruction instance
     * @param {Object} tools - Tools or utilities required for task execution
     * @param {Array} userMessages - Array to store user-facing messages
     * @param {string} filepath - Path to the YAML file containing task instructions
     * @param {string} refsection - Specific section in the YAML file to reference
     */
    constructor(tools = {}, userMessages = [], filepath = "", refsection = "") {
        this.tools = tools;
        this.userMessages = userMessages;
        this.filepath = filepath;
        this.refsection = refsection;
    }

    /**
     * Loads and processes the task instruction, adding it to user messages
     * @returns {Array} Updated array of user messages
     * @throws {Error} If file cannot be read or YAML is invalid
     */
    toPrompt() {
        try {

            // Read and parse YAML file
            const fileContents = fs.readFileSync(path.resolve(this.filepath), 'utf8');
            const data = yaml.load(fileContents);

            // Validate task section exists
            if (!data || !data[this.refsection]) {
                throw new Error(`Task section "${this.refsection}" not found in YAML file`);
            }

            const task = data[this.refsection];

            // Add task information to user messages
            this.userMessages.push({
                type: "text",
                text: `Task Description: ${task.description}\nExpected Output: ${task.expected_output}`
            });

            return this.userMessages;
        } catch (error) {
            console.error(`Error processing task instruction: ${error.message}`);
            throw error;
        }
    }
}

module.exports = {
    TaskInstruction
};