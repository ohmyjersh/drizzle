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

    componentWillReceiveProps(nextProps) {
     // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.state !== this.state) {
            this.setState(nextProps.state);
        }
    }

    render() {
        var items = this.state.recipes.length > 0 && this.state.recipes[this.state.recipe] !== undefined 
        ? <RecipeItem state={this.state}/> 
        : <RecipeStatus state={this.state}/>;
        return(<List>{items}</List>);
    }
}