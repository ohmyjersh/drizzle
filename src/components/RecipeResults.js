import React, { Component } from 'react';
import {List} from 'material-ui/List';
import RecipeItem from './RecipeItem';
import RecipeStatus from './ResultStatus';

export default class RecipeResults extends Component {
    constructor(props)
    {
        super(props);
        this.state = props.state;
    }

    render() {
        var items = this.state.recipes.length > 0 && this.state.recipes[this.state.recipe] !== undefined 
        ? <RecipeItem state={this.state}/> 
        : <RecipeStatus state={this.state}/>;
        return(<List>{items}</List>);
    }
}