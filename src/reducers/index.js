import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function findById(state, id) {
  return state.get('ingredients').findIndex(
    (ingredient) => ingredient.get('id') === id
  );
}

function removeIngredient(state, id) {
    return state.update('ingredients',
    (ingredient) => ingredient.filterNot(
      (ingredient) => ingredient.get('id') === id
    )
  );
}

function isEditing(state, id) {
  const index = findById(state, id);
  const setEdit = state.get('ingredients')
    .get(index)
    .set('isEdit', true);
  return state.update('ingredients', ingredients => ingredients.set(index, setEdit));
}

function doneEditing(state, id, text) {
  const index = findById(state, id);
  const ingredient = state.get('ingredients')
    .get(index)
    .set('isEdit', true)
    .set('ingredient', text);
  return state.update('ingredients', ingredients => ingredients.set(index, ingredient));
}

function addIngredient(state, text) {
    const itemId = state.get('ingredients').reduce((maxId, item) => Math.max(maxId,item.get('id')), 0) + 1;
    const newIngredient = Map({id: itemId, ingredient: text, isEdit: false});
    return state.update('ingredients', (ingredients) => ingredients.push(newIngredient));
}

function updateAdd(state, char){
  return state.set('add', char);
}

function resetAdd(state) {
  return state.set('add', '');
}

function clearAll(state, char){
  state.set('add','');
  state.set('ingredients',[]);
  state.set('recipes',[]);
  state.set('page',0);
  state.set('error', '0');
  return state.set('recipe',0);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return addIngredient(state, action.text);
    case 'SET_STATE':
      return setState(state, action.state);
    case 'UPDATE_ADD':
      return updateAdd(state, action.char);
    case 'CLEAR_ALL':
      return clearAll(state);
    case 'RESET_ADD':
      return resetAdd(state);
    case 'IS_EDITING':
      return isEditing(state, action.id);
    case 'DONE_EDITING':
      return doneEditing(state, action.id);
    case 'REMOVE':
      return removeIngredient(state, action.id);
  }
  return state;
}