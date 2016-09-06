var countIngredients = require('./../src/util.js').countIngredients;

test('should count ingredients that exist in recipe',()=> {
    let have = ['carro', 'celery'];
    let ingredients = ['carro', 'celery', 'cucumber'];
    expect(countIngredients(have, ingredients)).toBe(2);
});
test('should count ingredients that exist in recipe',()=> {
    let have = ['lol', 'butts'];
    let ingredients = ['carro', 'celery', 'cucumber'];
    expect(countIngredients(have, ingredients)).toBe(0);
});
