const codebolt = require("../src");
const fs = require('fs');

const testCases = [
    {
        name: 'createFile should create a file',
        testFunction: async () => {
            await codebolt.activate();
            const fileName = 'testFile.txt';
            const source = 'Test content';
            const filePath = '/test';
            const { projectPath } = await codebolt.project.getProjectPath();
            await codebolt.fs.createFile(fileName, source, filePath);
            const fileFullPath = projectPath + filePath + '/' + fileName;
            expect(fs.existsSync(fileFullPath)).toBe(true);
        }
    },
    {
        name: 'createFolder should send the correct message to websocket',
        testFunction: async () => {
            await codebolt.activate();
            const folderName = 'testFolder';
            const folderPath = '/test';
            const { projectPath } = await codebolt.project.getProjectPath();
            await codebolt.fs.createFolder(folderName, folderPath);
            // Assuming the folder creation is confirmed by the existence of the folder
            const folderFullPath = `${projectPath}${folderPath}/${folderName}`;
            expect(fs.existsSync(folderFullPath)).toBe(true);
        }
    },
    {
        name: 'deleteFolder should send the correct message to websocket',
        testFunction: async () => {
            await codebolt.activate();
            const folderName = 'testFolder';
            const folderPath = '/test';
            const { projectPath } = await codebolt.project.getProjectPath();
            await codebolt.fs.deleteFolder(folderName, folderPath);
            
            const folderFullPath = `${projectPath}${folderPath}/${folderName}`;
            expect(fs.existsSync(folderFullPath)).toBe(false);
        }
    },
    {
        name: 'readFile should send the correct message to websocket',
        testFunction: async () => {
            await codebolt.activate();
            const fileName = 'testFile.txt';
            const filePath = '/test';
            const { content } = await codebolt.fs.readFile(fileName, filePath);
            expect(content).toBe('Test content'); // Assuming 'Test content' is the expected content
        }
    },
    {
        name: 'updateFile should send the correct message to websocket',
        testFunction: async () => {
            await codebolt.activate();
            const fileName = 'testFile.txt';
            const filePath = '/test';
            const newContent = 'Updated content';
            await codebolt.fs.updateFile(fileName, filePath, newContent);
            const { projectPath } = await codebolt.project.getProjectPath();
            const fileFullPath = `${projectPath}${filePath}/${fileName}`;
            const updatedContent = fs.readFileSync(fileFullPath, 'utf8');
            console.log(updatedContent);
            expect(updatedContent).toBe(newContent);
        }
    },
    {
        name: 'deleteFile should send the correct message to websocket',
        testFunction: async () => {
            await codebolt.activate();
            const fileName = 'testFile.txt';
            const filePath = '/test';
            await codebolt.fs.deleteFile(fileName, filePath);
            const { projectPath } = await codebolt.project.getProjectPath();

            const fileFullPath = `${projectPath}${filePath}/${fileName}`;
            expect(fs.existsSync(fileFullPath)).toBe(false);
        }
    }
   
];

describe('Run test cases sequentially', () => {
    test.each(testCases)('%s', async (testCase) => {
        await testCase.testFunction();
    });
});
