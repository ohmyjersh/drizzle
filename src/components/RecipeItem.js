import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class RecipeItem extends Component {
    render() {
        var jsResults = this.props.results.toJS();
        var items = jsResults[this.props.recipe -1].map(x => {
            return <ListItem disabled={true}
                primaryText={<a href={x.href}>{x.title}</a>}
                secondaryText={<p><span>{x.ingredients.length}</span>{x.ingredients}</p>}/>
            });
        return(<span>{items}</span>);
    }
}