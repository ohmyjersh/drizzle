import React, { Component } from 'react';
import {List} from 'material-ui/List';
import IngredientItem from './IngredientItem';

export default class IngredientsList extends Component {
    render() {
        return(<List style={{padding:'0px 0px 0px 0px'}}><IngredientItem {...this.props}/></List>);
    }
}