var countIngredients = function(have, ingredients) {
    var count = 0;
    for(var i = 0; i < ingredients.length; i++) {
        for(s=0; s < have.length; i++) {
            if(ingredients[i] === have[s])
                return count++;
            return;    
        }   
    }
    return count;
}

module.exports = {countIngredients};