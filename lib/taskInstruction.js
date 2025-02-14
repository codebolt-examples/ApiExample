

/**
 * This encapsulates the Tasks for that has to be done. This is more about 
 */

const yaml = require('js-yaml');
const fs = require('fs');

class TaskInstruction {
    constructor(tools = {}, userMessage = {}, filepath = "", refsection = "") {
        this.tools = tools;
        this.task = [];
        this.userMessage = userMessage
        this.filepath = filepath;
        this.refsection = refsection;
    }
     toPrompt() {
        
        let fileContents = fs.readFileSync(this.filepath, 'utf8');
        let data = yaml.load(fileContents);
        return data[this.refsection];
    }
}

module.exports = {
    TaskInstruction
}


