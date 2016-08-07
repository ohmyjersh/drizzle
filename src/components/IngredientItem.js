import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle';

export default class IngredientItem extends Component {
    constructor(props)
    {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
     // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.state !== this.state) {
            this.setState(nextProps.state);
        }
    }

    removeIngredient() {
        this.setState({
            
        });
    }
    
    onEdit(id) {
        return this.props.isEditing(id);
    }

    onRemove(id) {
        return this.props.removeIngredient(id);
    }

    render() {
        // add isEdit property for each ingredient, when row selected set isEdit=true for that item.  Swap list item for editing one.
        //console.log('props: ' + JSON.stringify(this.props));
        return(<span>{this.props.ingredients.map(x => {
           return x.get('isEdit') 
           ? <ListItem rightIconButton={
              <IconButton onClick={(e) => this.onRemove(x.get('id'))}>
                    <Remove />
            </IconButton>} primaryText={x.get('ingredient')}/> 
           : <ListItem><TextField
                    value={x.get('ingredient')}
                    hintText="Add Ingredient" 
                    onClick={(e) => this.onEdit(x.get('id'))}/>
                    </ListItem>})}
            </span>);
    }
}