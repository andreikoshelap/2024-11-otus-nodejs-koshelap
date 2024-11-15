const fs = require('fs');
const path = require('path');

console.log(__dirname);
const directoryPath = path.join(__dirname, 'Node.js'); // Replace 'your-folder-name' with your folder name or use an absolute path

function fetchAllFilesAndFolders(dirPath) {
    fs.readdir(directoryPath, (err, items) => {
        if (err) {
            return console.log(`Unable to scan directory: ${err}`);
        }

        // Log all files and directories found in the folder
        items.forEach((item) => {
            const fullPath = path.join(dirPath, item);
            // console.log(item);

            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.log(`Error retrieving stats for ${item}: ${err}`);
                } else {
                    if (stats.isDirectory()) {
                        console.log(`Directory: ${fullPath}`);

                        fetchAllFilesAndFolders(fullPath);
                    } else {
                        console.log(`File: ${fullPath}`);
                    }
                }
            });
        });
    });
}

fetchAllFilesAndFolders(directoryPath);
