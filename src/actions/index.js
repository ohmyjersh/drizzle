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
export function doneEditing(id) {
  return {
    type: 'DONE_EDITING',
    id
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