import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

const haveIngredient = (ingredient) => {
    return <span style={{fontWeight: 'bold', fontSize:'16px'}}>{ingredient}</span>
}
const Ingredient = (ingredient) => {
    return <span>{ingredient}</span>    
}

export default class RecipeItem extends Component {
    listIngredients(ingredients, ingredientsList) {
        let ingredArr = ingredients.split(',')
        return ingredArr.map(x => {
            let found = false;
            ingredientsList.forEach((ingredient) => {
                if (ingredient.ingredient === x.trim()){
                    found = true;
                }
            });
            if(found) {
                return haveIngredient(x);
            }
            else {
                return Ingredient(x);
            }
        });
    }
    render() {
        let jsResults = this.props.results.toJS();
        let items = jsResults[this.props.recipe -1].map(x => {
            return <ListItem 
                onClick={() => window.open(x.href,'_blank') }
                style={{ paddingLeft: '20px', paddingRight: '20px', width: '93.9%' }}
                primaryText={<p>{x.title}</p>}
                secondaryText={<p>{this.listIngredients(x.ingredients, this.props.ingredients.toJS())}</p>}
                innerDivStyle={{padding:'0px 0px 0px 0px'}}/>
            });
        return(<span>{items}</span>);
    }
}

