var expect = require('chai').expect;
var countIngredients = require('./../src/util.js').countIngredients;
describe('util works', ()=> {
    it('should count ingredients that exist in recipe',()=> {
        let have = ['carro', 'celery'];
        let ingredients = ['carro', 'celery', 'cucumber'];
        expect(countIngredients(have, ingredients)).to.equal(2);
    });
    it('should count ingredients that exist in recipe',()=> {
        let have = ['lol', 'butts'];
        let ingredients = ['carro', 'celery', 'cucumber'];
        expect(countIngredients(have, ingredients)).to.equal(0);
    });
});