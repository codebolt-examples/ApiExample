const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the directory containing your TypeScript files
const dir = './src';

// Define the output directory for the documentation
const outDir = './document';

// Use a recursive function to find all TypeScript files in the directory and its subdirectories
function getFiles(dir) {
    return fs.readdirSync(dir).reduce((files, file) => {
        const filePath = path.join(dir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        return isDirectory ? [...files, ...getFiles(filePath)] : [...files, filePath];
    }, []);
}

// Get all TypeScript files
const tsFiles = getFiles(dir).filter(file => file.endsWith('.ts'));

// Generate documentation for each TypeScript file
tsFiles.forEach(file => {
    const outPath = path.join(outDir, path.basename(file, '.ts'));
    execSync(`npx typedoc --plugin typedoc-plugin-markdown --out ${outPath} ${file}`);
});