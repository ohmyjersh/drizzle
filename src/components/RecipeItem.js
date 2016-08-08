import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class RecipeItem extends Component {
    render() {
        console.log('recipes: ' + JSON.stringify(this.props.recipes));
        var items = this.props.recipes.findIndex(this.props.recipe).map(x => {
            console.log(JSON.stringify('x: ' + x));
            return <ListItem disabled={true}
                primaryText={<a href={x.href}>{x.title}</a>}
                secondaryText={x.ingredients}/>
            });
        return(<span>{items}</span>);
    }
}