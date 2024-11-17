const jsonData = {
    name: 1,
    items: [
        {
            name: 2,
            items: [{ name: 3 }, { name: 4 }],
        },
        {
            name: 5,
            items: [{ name: 6 }],
        },
    ],
};

const {
    BRACKET_SYMBOL,
    STICK_SYMBOL,
    UNDRERLINE_SYMBOL,
    STEP
} = require('./constants');

function convertToArray(data, offset) {
    const counter = offset/STEP;
    const result = [data.name];
    const spaces = BRACKET_SYMBOL.repeat(offset);
    console.log(STICK_SYMBOL.repeat(counter) + spaces + data.name);


    if (data.items && Array.isArray(data.items)) {
        const children = data.items.map((item) => {
            convertToArray(item, offset+STEP);
        }
        );
        result.push(children);
    }

    return result;
}

convertToArray(jsonData, 0);