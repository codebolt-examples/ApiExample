

/**
 * This encapsulates the Tasks for that has to be done. This is more about 
 */

const yaml = require('js-yaml');
const fs = require('fs');

class TaskInstruction {
    constructor(tools = {}, userMessages = [], filepath = "", refsection = "") {
        this.tools = tools;
        this.task = [];
        this.userMessages = userMessages
        this.filepath = filepath;
        this.refsection = refsection;
    }
    toPrompt() {
        let fileContents = fs.readFileSync(this.filepath, 'utf8');
        let data = yaml.load(fileContents);

        let task = data[this.refsection]

        this.userMessages.push({
            type: "text",
            text: `Task Description: ${task.description}\nExpected Output: ${task.expected_output}`
        });
        return this.userMessages;
    }
}

module.exports = {
    TaskInstruction
}


