const fs = require('fs');

fs.readFile('example.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error file reading :', err);
        return;
    }
    // console.log('file content:', data);
    const array = JSON.parse(data, (key, value) => {
        if (key === 'items' && Array.isArray(value)) {
            return value.map(item => ({
                ...item
            }));
        }
        return value;
    });
    console.log('file content:', array);
});
