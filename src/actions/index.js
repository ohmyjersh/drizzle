import * as actionTypes from './types';

export function addIngredient(text) {
  return {
    type: actionTypes.ADD_INGREDIENT,
    text
  }
}
export function updateAdd(char) {
  return {
    type: actionTypes.UPDATE_ADD,
    char
  };
}
export function clearAll() {
  return {
    type: actionTypes.CLEAR_ALL
  };
}
export function resetAdd() {
  return {
    type: actionTypes.RESET_ADD
  };
}
export function isEditing(id, status) {
  return {
    type: actionTypes.IS_EDITING,
    id,
    status
  };
}
export function removeIngredient(id) {
  return {
    type: actionTypes.REMOVE,
    id
  }
}
export function updateIngredient(id, text) {
  return {
    type: actionTypes.UPDATE_INGREDIENT,
    id,
    text
  };
}
export function previousRecipes() {
  return {
    type:actionTypes.PREVIOUS_RECIPES
  };
}
export function nextRecipes() {
  return {
    type:actionTypes.NEXT_RECIPES
  };
}
export function setError(text, fetching){
  return {
    type:actionTypes.SET_ERROR,
    text,
    fetching
  };
}
export function recipeRequest() {
  return {
  type: actionTypes.RECIPE_REQUEST
  }
}
export function recipeResponse(recipes) {
  return {
    type:actionTypes.RECIPE_RESPONSE,
    recipes: recipes
  }
}

export function getRecipes(ingredientsStr, page) {
  return dispatch => {
    dispatch(recipeRequest())
    return fetch(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${ingredientsStr}&q=salad%20dressing&p=${page + 1}`, { method: 'GET', mode: 'cors',
               cache: 'default' })
            .then(response => {
              if(response.status !== 200) {
                dispatch(setError('No recipes found, try again...', false));
                throw Error('error');
              }
              else {
                return response.json()
              }})
            .then((json) => {
              if(json.results.length === 0) {
                dispatch(setError('No recipes found, try again...', false));
                throw Error('error');
              }
              else {
                dispatch(recipeResponse(json.results));
              }
            });
    };
}