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
    SPACE_SYMBOL,
    STICK_SYMBOL,
    UNDRERLINE_SYMBOL,
    STEP
} = require('./constants');

function convertToArray(data, offset) {
    const result = [data.name];
    const spaces = SPACE_SYMBOL.repeat(offset);
    console.log(spaces + data.name);
    console.log(spaces + STICK_SYMBOL);
    if (offset === 0) {
        const underline = UNDRERLINE_SYMBOL.repeat(offset+STEP);
        console.log(spaces + underline);
    }

    if (data.items && Array.isArray(data.items)) {
        const underline = UNDRERLINE_SYMBOL.repeat(offset);
        console.log(spaces + underline);
        const children = data.items.map((item) => {
            convertToArray(item, offset+STEP);
        }
        );
        result.push(children);
    }

    return result;
}

convertToArray(jsonData, 0);