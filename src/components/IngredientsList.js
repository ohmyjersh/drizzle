import React, { Component } from 'react';
import {List} from 'material-ui/List';
import IngredientItem from './IngredientItem';

export default class IngredientsList extends Component {
    render() {
        return(<List><IngredientItem {...this.props}/></List>);
    }
}