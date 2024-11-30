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
    STEP,
} = require('./constants');

function convertToArray(data, offset, result = 0) {
    const counter = offset / STEP;
    const spaces = BRACKET_SYMBOL.repeat(offset);
    console.log(STICK_SYMBOL.repeat(counter) + spaces + data.name);

    result++; // Увеличиваем локальный счетчик

    if (data.items && Array.isArray(data.items)) {
        data.items.forEach((item) => {
            result = convertToArray(item, offset + STEP, result); // Передаём текущий результат
        });
    }

    return result; // Возвращаем итоговый результат
}

const finalResult = convertToArray(jsonData, 0);
console.log('Final result:', finalResult);
module.exports = convertToArray;
