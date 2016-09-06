var countIngredients = function(have, ingredients) {
    var count = 0;
    for(var i = 0; i < ingredients.length; i++) {
        for(var s=0; s < have.length; s++) {
            if(ingredients[i] === have[s])
                {count++;}
        }   
    }
    return count;
}

module.exports = {countIngredients};