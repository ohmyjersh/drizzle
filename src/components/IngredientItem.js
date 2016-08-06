import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import Remove from 'material-ui/svg-icons/content/remove-circle';

export default class IngredientItem extends Component {
    constructor(props)
    {
        super();
        this.state = props.state;
    }

    componentWillReceiveProps(nextProps) {
     // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.state !== this.state) {
            this.setState(nextProps.state);
        }
    }

    removeIngredient() {
        this.setState({

        });
    }
    
    render() {
        return(<span>{this.state.ingredients.map(x => {
          return <ListItem primaryText={x}/>})}</span>);
    }
}