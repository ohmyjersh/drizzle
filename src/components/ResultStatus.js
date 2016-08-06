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
        return(<span><ListItem>Enter ingredients and search</ListItem></span>);
    }
}