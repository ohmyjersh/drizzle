import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class RecipeItem extends Component {
    render() {
        return(<span>{this.props.recipes.size}</span>)
    }
    // render() {
    //     var items = this.props.recipes[this.props.recipe].map(x => {
    //         console.log(x);
    //         return <ListItem disabled={true}
    //             primaryText={<a href={x.href}>{x.title}</a>}
    //             secondaryText={x.ingredients}/>
    //         });
    //     return(<span>{items}</span>);
    // }
}