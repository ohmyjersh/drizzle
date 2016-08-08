import React, { Component } from 'react';
import {List} from 'material-ui/List';
import RecipeItem from './RecipeItem';
import RecipeStatus from './ResultStatus';

export default class RecipeResults extends Component {
    render() {
        var items = this.props.recipes.size > 0 //&& this.props.recipes[this.props.recipe] !== undefined 
        ? <RecipeItem {...this.props}/> 
        : <RecipeStatus {...this.props}/>;
        return(<List>{items}</List>);
    }
}