const convertToArray = require('./index');
const jsonData = {
    name: 'root',
    items: [
        { name: 'child1', items: [{ name: 'grandchild1' }] },
        { name: 'child2' },
    ],
};

describe('convertToArray', () => {
    test('should process JSON data and return the correct result', () => {
        const result = convertToArray(jsonData, 0);

        expect(result).toBe(4);

    });

    test('should handle data without items', () => {
        const dataWithoutItems = { name: 'singleNode' };
        const result = convertToArray(dataWithoutItems, 0);

        expect(result).toBe(1);

    });
});
