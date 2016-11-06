import React, { Component } from 'react';
import {List} from 'material-ui/List';
import RecipeItem from './RecipeItem';
import RecipeStatus from './ResultStatus';

export default class RecipeResults extends Component {
    render() {
        var items = this.props.results.size > 0 
        ? <RecipeItem {...this.props}/> 
        : <RecipeStatus {...this.props}/>;
        return(<List>{items}</List>);
    }
}