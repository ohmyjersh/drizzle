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