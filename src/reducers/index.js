import {Map} from 'immutable';

function addIngredient(state, text) {
    var max = state.get('ingredients').sort(a.id - b.id)[0];
    console.log(max);
    const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId,item.get('id')), 0) + 1;
    const newIngredient = Map({id: max+1, ingredient: text, isEdit: false});
    return state.update('ingredients', (ingredients) => ingredients.push(newIngredient));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return addIngredient(state, action.text);
  }
  return state;
}