import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

const haveIngredient = (ingredient) => {
    return <span style="font-weight: bold;">{ingredient}</span>
}
const Ingredient = (ingredient) => {
    return <span>{ingredient}</span>    
}

export default class RecipeItem extends Component {
    listIngredients(ingredients, ingredientsList) {
        return ingredients.map(x => {
            if (ingredientsList.indexOf(x) > -1) {
                return haveIngredient(x);
            } else {
                return Ingredient(x);
            }
        });
    }
    render() {
        var jsResults = this.props.results.toJS();
        var items = jsResults[this.props.recipe -1].map(x => {
            return <ListItem disabled={true}
                primaryText={<a href={x.href}>{x.title}</a>}
                secondaryText={<p><span>{x.ingredients.length}</span>{this.listIngredients(x.ingredients.split(','))}</p>}/>
            });
        return(<span>{items}</span>);
    }
}

