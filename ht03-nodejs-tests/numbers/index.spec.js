const treeBuilder = require('./index.js')

describe('treeBuilder.builder', () => {
  test('it should correctly build tree', () => {

    const jsonData = require('./numbers.json');
    // act
    const result = treeBuilder.builder(jsonData);

    // assert(expect)
    expect(result).toStrictEqual([1, [undefined, undefined]]);
  });

  test('it shouldthrow error related to wrong json file', () => {

    const jsonData = require('./numbers-wrong.json');

    expect(() => treeBuilder.builder(jsonData)).toThrow(new Error('Expected property name or \'}\' in JSON at position 74'));
  })

})
