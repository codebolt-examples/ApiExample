const yaml = require('js-yaml');
const fs = require('fs');
class SystemPrompt {
    constructor(filepath = "", key = "",) {
        this.filepath = filepath;
        this.key = key;
        //Here we can also look in the description in Codeboltagent.yaml
    }
    toPromptText() {
        if (this.filepath != "") {
            let fileContents = fs.readFileSync(this.filepath, 'utf8');
            let data = yaml.load(fileContents);
            return data[this.key];
        }
    }
}

module.exports = {
    SystemPrompt
}