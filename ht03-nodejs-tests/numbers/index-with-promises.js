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
const UNDRER_LINE_SYMBOL = '_';

function convertToArray(data, spacesCount) {
    const spaces = SPACE_SYMBOL.repeat(spacesCount);
    
    return new Promise((resolve) => {
        resolve = [data.name];
        console.log(spaces + data.name);
        console.log(spaces + STICK_SYMBOL);
        if (spacesCount === 0) {
            console.log(spaces + UNDRER_LINE_SYMBOL.repeat(spacesCount+10));
        }
        if (data.items && Array.isArray(data.items)) {
            console.log(spaces + UNDRER_LINE_SYMBOL.repeat(spacesCount));
            const children = data.items.map((item) => {
                Promise.all([convertToArray(item, spacesCount+10)])
                .then([convertToArray]);
            }
            );
            resolve.push(children);
        }
    
        return resolve;

    });

}

convertToArray(jsonData, 0);
