
function countIngredients(have, ingredients) {
    var count = 0;
    for(var i = 0; i < ingredients.length; i++) {
        for(s=0; s < have.length; i++) {
            if(ingredients[i] === have[s])
                count++;
        }   
    }
    return count;
}

export default {countIngredients};