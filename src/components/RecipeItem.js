import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class RecipeItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = props.state;
    }

    render() {
        var items = this.state.recipes[this.state.recipe].map(x => {
              return <ListItem disabled={true}
                primaryText={<a href={x.href}>{x.title}</a>}
                secondaryText={x.ingredients}/>
            });
        return(<span>{items}</span>);
    }
}