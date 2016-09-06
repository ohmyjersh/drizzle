var {List, Map, fromJS} = require('immutable');
var {expect} = require('chai');
var reducer = require('../../src/reducers');


var initialState;
beforeEach('setup state', () => {
    initialState = fromJS({add:'',
        ingredients:[],
        results:[],
        page:0,
        recipe:0,
        error:''
    });
});
test('',()=>{
    // set action
    const action = {type:'ADD_INGREDIENT' ,text: 'h'};
    // get state
    console.log(reducer);
    var nextState = reducer(initialState, action);
    // assert state
    expect(nextState).toBe(fromJS({add:'h',
        ingredients:[],
        results:[],
        page:0,
        recipe:0,
        error:''
    }));
})