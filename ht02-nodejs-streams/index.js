const fs = require('fs');
const { Transform } = require('stream');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Please provide a file name as an argument.');
    process.exit(1);
}

const fileName = args[0];

const readStream = fs.createReadStream(__dirname + fileName, 'utf8');

const chunkSeparator = new Transform({
    transform(chunk, encoding, callback) {
        const elements = chunk.toString().replace(/[^\w \n]/g, '').split(/\s+/);
        const occurrencesMap = elements.reduce((map, item) => {
            map.set(item, (map.get(item) || 0) + 1);
            return map;
        }, new Map());

        const mapAsArray = Array.from(occurrencesMap);

        callback(null, JSON.stringify(mapAsArray));
    },
});

readStream.pipe(chunkSeparator).on('data', (data) => {
    console.log('Transformed:', JSON.parse(data));
});
