import React, { Component } from 'react';
import {List} from 'material-ui/List';
import IngredientItem from './IngredientItem';

export default class IngredientsList extends Component {
    constructor(props)
    {
        super();
        this.state = props.state;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state !== this.state) {
            this.setState(nextProps.state);
        }
    }

    render() {
        return(<List><IngredientItem state={this.state}/></List>);
    }
}