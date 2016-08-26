import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../../src/reducers';

describe('reducer spec', () =>{
    beforeEach('setup state', () => {
        var initialState = fromJS({add:'',
            ingredients:[],
            results:[],
            page:0,
            recipe:0,
            error:''
        });
    });
    it('',()=>{
        // set action
        const action = {type:'ADD_INGREDIENT' ,text: 'h'};
        // get state
        var nextState = reducer(initialState, action);
        // assert state
        expect(nextState).to.equal(fromJS({add:'h',
            ingredients:[],
            results:[],
            page:0,
            recipe:0,
            error:''
        }));
    })

});