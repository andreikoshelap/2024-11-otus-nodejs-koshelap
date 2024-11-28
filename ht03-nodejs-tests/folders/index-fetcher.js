const fs = require('fs');
const path = require('path');

const {
    BRACKET_SYMBOL,
    STICK_SYMBOL,
    UNDRERLINE_SYMBOL,
    DOUBLE_BRACKET_SYMBOL,
    STEP
} = require('../constants');

const root = 'Node.js';

const directoryPath = path.join(__dirname, root);
console.log(root);

function fetchAllFilesAndFolders(dirPath, offset) {
    const counter = offset/STEP - 1;
    const items = fs.readdirSync(dirPath);
    const line = BRACKET_SYMBOL.repeat(offset);   

    for (let index = 0; index < items.length-1; index++) {
        const fullPath = path.join(dirPath, items[index]);
        const stats = fs.statSync(fullPath);
        console.log(STICK_SYMBOL.repeat(counter) + UNDRERLINE_SYMBOL + line + path.parse(items[index]).base);

        if (stats.isDirectory()) {
            fetchAllFilesAndFolders(fullPath, offset + STEP);
        }
    }

    if(items.length > 0) {
        const fullPath = path.join(dirPath, items[items.length-1]);
        const stats = fs.statSync(fullPath);
        console.log(STICK_SYMBOL.repeat(counter) + DOUBLE_BRACKET_SYMBOL + line + path.parse(items[items.length-1]).base);

        if (stats.isDirectory()) {
            fetchAllFilesAndFolders(fullPath, offset + STEP);
        }
    }

}

fetchAllFilesAndFolders(directoryPath, STEP);
