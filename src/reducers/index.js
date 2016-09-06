import Immuteable, {Map, List} from 'immutable';

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
  let updatedIngredient = state.get('ingredients')
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
function previousRecipes(state) {
    const previousRecipe = state.set('recipe', state.get('recipe')-1);
    return state.merge(previousRecipe);
 }
 function nextRecipes(state) {
    const nextRecipes = state.set('recipe', state.get('recipe')+1);
    return state.merge(nextRecipes);
 }
function clearAll(state){
  const newState = Immuteable.fromJS({add:'',
      ingredients:[],
      results:[],
      page:0,
      recipe:0,
      error:''});
  return state.merge(newState);
}
function getRecipes(state, recipes) {
      return state.set('page', state.get('page') + 1)
          .set('recipe', state.get('recipe')+1)
          .set('isFetching', false)
          .update('results', (results) => results.push(recipes));
}
function recipeRequest(state) {
    return state.set('isFetching', true);
  }

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return addIngredient(state, action.text);
    case 'UPDATE_ADD':
      return updateAdd(state, action.char);
    case 'CLEAR_ALL':
      return clearAll(state);
    case 'IS_EDITING':
      return isEditing(state, action.id, action.status);
    case 'REMOVE':
      return removeIngredient(state, action.id);
    case 'UPDATE_INGREDIENT':
      return updateIngredient(state, action.id, action.text);
    case 'RECIPE_REQUEST':
      return recipeRequest(state);
    case 'RECIPE_RESPONSE':
      return getRecipes(state, action.recipes);
    case 'PREVIOUS_RECIPES':
      return previousRecipes(state);
    case 'NEXT_RECIPES':
      return nextRecipes(state);
  }
  return state;
}