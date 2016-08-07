import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

// update to set multiple stuff
function addIngredient(state, text) {
    const itemId = state.get('ingredients').reduce((maxId, item) => Math.max(maxId,item.get('id')), 0) + 1;
    const newIngredient = Map({id: itemId, ingredient: text, isEdit: false});
    return state.update('ingredients', (ingredients) => ingredients.push(newIngredient));
}

function updateAdd(state, char){
  return state.merge('add', () => {return char;});
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return addIngredient(state, action.text);
    case 'SET_STATE':
      return setState(state, action.state);
    case 'UPDATE_ADD':
      return updateAdd(state, action.char);
  }
  return state;
}