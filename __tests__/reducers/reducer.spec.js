var {List, Map, fromJS} = require('immutable');
import reducer from '../../src/reducers';

test('',()=>{
  var reducer = require('../../src/reducers');
   var initialState = fromJS({add:'',
        ingredients:[],
        results:[],
        page:0,
        recipe:0,
        error:''
    });
    // set action
    const action = {type:'UPDATE_ADD' ,char: 'h'};
    // get state
    var nextState = reducer(initialState, action);
    // assert state
    expect(nextState).toEqual(fromJS({add:'h',
        ingredients:[],
        results:[],
        page:0,
        recipe:0,
        error:''
    }));
})