import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class ResultStatus extends Component {
    render() {
        var text = this.props.error === '' ? <ListItem disabled={true}>Enter ingredients and search</ListItem> : <ListItem disabled={true}>{this.props.error}</ListItem>;
        return(<span>{text}</span>);
    }
}