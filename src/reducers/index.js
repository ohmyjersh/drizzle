import {Map, List} from 'immutable';

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

function updateIngredient(state, id, text) {
  const index = findById(state, id);
  return state.get('ingredients')
    .get(index)
    .set('ingredient', text);

  return state.update('ingredients', ingredients => ingredients.set(index, updatedIngredient));
}

function isEditing(state, id, status) {
  const index = findById(state, id);
  const setEdit = state.get('ingredients')
    .get(index)
    .set('isEdit', status);
  return state.update('ingredients', ingredients => ingredients.set(index, setEdit));
}

function addIngredient(state, text) {
    const itemId = state.get('ingredients').reduce((maxId, item) => Math.max(maxId,item.get('id')), 0) + 1;
    const newIngredient = Map({id: itemId, ingredient: text, isEdit: false});
    return state.set('add', '').update('ingredients', (ingredients) => ingredients.push(newIngredient));
}

function updateAdd(state, char){
  return state.set('add', char);
}

function resetAdd(state) {
  return state.set('add', '');
}

function previousRecipes(state) {



    const previousRecipe = state.set('recipe', state.get('recipe')-1);
    return state.merge(previousRecipe);
 }
function clearAll(state, char){
  const newState = state
    .set('add','')
    .set('ingredients', new List())
    .set('recipes',new List())
    .set('page',0)
    .set('error', '')
    .set('recipe',0);
  return setState(state, newState);
}
function getRecipes(state, recipes) {
        console.log(JSON.stringify(state.recipes));
        var recipe = state.get('recipe');
        var prevRecipes = state.get('recipes');
        console.log(JSON.stringify(state.recipes));
        prevRecipes.push({recipes:recipes});
        if(state.get('recipes').length > 0){ recipe += 1;}
        const addRecipes = state
          .set('recipes', prevRecipes)
          .set('page', state.get('page') + 1)
          .set('recipe', recipe);
        return state.set(addRecipes);
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
      return isEditing(state, action.id, action.status);
    case 'REMOVE':
      return removeIngredient(state, action.id);
    case 'UPDATE_INGREDIENT':
      return updateIngredient(state, action.id, action.text);
    case 'RECIPE_RESPONSE':
      return getRecipes(state, action.recipes);
    case 'PREVIOUS_RECIPE':
      return previousRecipes(state);
  }
  return state;
}