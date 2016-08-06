import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class RecipeItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = props.state;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state !== this.state) {
            this.setState(nextProps.state);
        }
    }

    render() {
        console.log(this.state.recipe);
        var items = this.state.recipes[this.state.recipe].map(x => {
              return <ListItem disabled={true}
                primaryText={<a href={x.href}>{x.title}</a>}
                secondaryText={x.ingredients}/>
            });
        return(<span>{items}</span>);
    }
}