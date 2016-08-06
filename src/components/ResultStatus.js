import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';

export default class ResultStatus extends Component {
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
        var text = this.state.error === '' ? <ListItem>Enter ingredients and search</ListItem> : <ListItem>{this.state.error}</ListItem>;
        return(<span>{text}</span>);
    }
}