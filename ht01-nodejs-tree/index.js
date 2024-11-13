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
    // Массив для текущего уровня
    const result = [data.name];
    const spaces = ' '.repeat(spacesCount);
    console.log(spaces + data.name);
    console.log(spaces + "|");
    console.log(spaces + "--");
    

    // Если есть вложенные элементы, создаем подмассивы рекурсивно
    if (data.items && Array.isArray(data.items)) {
        const children = data.items.map((item) => {
            convertToArray(item, spacesCount+10);
        }
        );
        result.push(children);
    }

    return result;
}

const multidimensionalArray = convertToArray(jsonData, 0);
