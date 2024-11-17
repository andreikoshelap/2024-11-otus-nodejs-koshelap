const fs = require('fs');
const path = require('path');

const {
    SPACE_SYMBOL,
    STICK_SYMBOL,
    UNDRERLINE_SYMBOL,
    STEP
} = require('./constants');

const root = 'Node.js';

const directoryPath = path.join(__dirname, root);
console.log(root);

// console.log('\u251C'+line);
// console.log(STICK_SYMBOL);
// const underline = UNDRERLINE_SYMBOL.repeat(STEP);
// console.log(underline);

function fetchAllFilesAndFolders(dirPath, offset) {
    const items = fs.readdirSync(dirPath);
    const line = '\u2500'.repeat(offset);    
    items.forEach((item) => {
        const fullPath = path.join(dirPath, item);

        const stats = fs.statSync(fullPath);
        const spaces = SPACE_SYMBOL.repeat(offset);
        console.log('\u251C'+line + path.parse(item).base);
        console.log(spaces +  STICK_SYMBOL);
        if (stats.isDirectory()) {
            const underline = UNDRERLINE_SYMBOL.repeat(STEP);
            console.log(spaces + underline);
            fetchAllFilesAndFolders(fullPath, offset + STEP);
        }
    });
}

fetchAllFilesAndFolders(directoryPath, 10);
