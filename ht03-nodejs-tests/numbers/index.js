module.exports = {
    builder(jsonData) {
        return convertToArray(jsonData, 0);
    }
}


const jsonData = require('./numbers.json');

const {
    BRACKET_SYMBOL,
    STICK_SYMBOL,
    STEP
} = require('./../constants');

function convertToArray(data, offset) {
    const counter = offset / STEP;
    const result = [data.name];
    const spaces = BRACKET_SYMBOL.repeat(offset);
    console.log(STICK_SYMBOL.repeat(counter) + spaces + data.name);


    if (data.items && Array.isArray(data.items)) {
        const children = data.items.map((item) => {
                convertToArray(item, offset + STEP);
            }
        );
        result.push(children);
    }

    return result;
}

convertToArray(jsonData, 0);
