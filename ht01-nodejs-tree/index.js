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

const SPACE_SYMBOL = ' ';
const STICK_SYMBOL = "|";
const UNDRERLINE_SYMBOL = '_';

function convertToArray(data, spacesCount) {
    const result = [data.name];
    const spaces = SPACE_SYMBOL.repeat(spacesCount);
    console.log(spaces + data.name);
    console.log(spaces + STICK_SYMBOL);
    if (spacesCount === 0) {
        const underline = UNDRERLINE_SYMBOL.repeat(spacesCount+10);
        console.log(spaces + underline);
    }

    if (data.items && Array.isArray(data.items)) {
        const underline = UNDRERLINE_SYMBOL.repeat(spacesCount);
        console.log(spaces + underline);
        const children = data.items.map((item) => {
            convertToArray(item, spacesCount+10);
        }
        );
        result.push(children);
    }

    return result;
}

convertToArray(jsonData, 0);