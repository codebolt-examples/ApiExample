class Task {
    constructor(tools = {}) {
        this.tools = tools;
        this.task = [];
    }

    async initialize(req) {
        let customInstructions;
        let PROMPT;

        try {
            const agentYamlPath = path.resolve(__dirname, 'task.yaml');
            const agentYamlContent = fs.readFileSync(agentYamlPath, 'utf8');
            const match = agentYamlContent.match(/PROMPT: \|([\s\S]*?)\n\n/);
            if (match) {
                PROMPT = match[1].trim();
            } else {
                throw new Error("PROMPT not found in agent.yaml");
            }
        } catch (error) {
            console.error("Error reading PROMPT from agent.yaml:", error);
            throw new Error("Initialization error");
        }
    }
}


