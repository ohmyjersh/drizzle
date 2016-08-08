import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class RecipeItem extends Component {
    render() {
        var jsResults = this.props.results.toJS();
        var items = jsResults[this.props.recipe].map(x => {
            return <ListItem disabled={true}
                primaryText={<a href={x.href}>{x.title}</a>}
                secondaryText={x.ingredients}/>
            });
        return(<span>{items}</span>);
    }
}