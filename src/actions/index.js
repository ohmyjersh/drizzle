export function addIngredient(text) {
  return {
    type: 'ADD_INGREDIENT',
    text
  }
}
export function updateAdd(char) {
  return {
    type: 'UPDATE_ADD',
    char
  };
}
export function clearAll() {
  return {
    type: 'CLEAR_ALL'
  };
}
export function resetAdd() {
  return {
    type: 'RESET_ADD'
  };
}
export function isEditing(id, status) {
  return {
    type: 'IS_EDITING',
    id,
    status
  };
}
export function removeIngredient(id) {
  return {
    type: 'REMOVE',
    id
  }
}
export function updateIngredient(id, text) {
  return {
    type: 'UPDATE_INGREDIENT',
    id,
    text
  };
}
export function previousRecipes() {
  return {
    type:'PREVIOUS_RECIPES'
  };
}
export function nextRecipes() {
  return {
    type:'NEXT_RECIPES'
  };
}
export function setError(text){
  return {
    type:'SET_ERROR',
    text
  };
}
export function recipeRequest() {
  return {
  type: 'RECIPE_REQUEST'
  }
}
export function recipeResponse(recipes) {
  return {
    type:'RECIPE_RESPONSE',
    recipes: recipes
  }
}
export function getRecipes(ingredientsStr, page) {
  return dispatch => {
    dispatch(recipeRequest())
    return fetch(`http://www.recipepuppy.com/api/?i=${ingredientsStr}&q=salad%20dressing&p=${page + 1}`, { method: 'GET',
               cache: 'default' })
            .then(response => response.json())
            .then((json) => {
              if(json.results.length === 0) {
                dispatch(setError('no recipes found'));
              }
              else {
                dispatch(recipeResponse(json.results));
              }
            });
    };
}