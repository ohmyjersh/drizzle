import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class ResultStatus extends Component {
    constructor(props)
    {
        super(props);
        this.state = props.state;
    }
    
    render() {
        var text = this.state.error === '' ? <ListItem disabled={true}>Enter ingredients and search</ListItem> : <ListItem disabled={true}>{this.state.error}</ListItem>;
        return(<span>{text}</span>);
    }
}