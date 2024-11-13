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

function convertToArray(data, spacesCount) {
    const result = [data.name];
    const spaces = ' '.repeat(spacesCount);
    console.log(spaces + data.name);
    console.log(spaces + "|");
    if (spacesCount === 0) {
        const underline = '_'.repeat(spacesCount+10);
        console.log(spaces + underline);
    }

    if (data.items && Array.isArray(data.items)) {
        const underline = '_'.repeat(spacesCount);
        console.log(spaces + underline);
        const children = data.items.map((item) => {
            convertToArray(item, spacesCount+10);
        }
        );
        result.push(children);
    }

    return result;
}

const multidimensionalArray = convertToArray(jsonData, 0);
