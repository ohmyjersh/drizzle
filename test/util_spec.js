import {expect} from 'chai';
import {countIngredients} from '../../src/util.js';
describe('util works', ()=> {
    it('should count ingredients that exist in recipe',()=> {
        let have = ['carro', 'celery'];
        let ingredients = ['carro', 'celery', 'cucumber'];
        countIngredients(have, ingredients).expect.to.equal(2);
    });
});