import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle';

export default class IngredientItem extends Component {
    onEdit(id, status) {
        return this.props.isEditing(id, status);
    }

    onUpdate(e, id) {
        return this.props.updateIngredient(id, e.target.value);
    }

    onDone(e, id){
    if (e.key === 'Enter' && e.target.value !== '') {
        return this.onEdit(id, false);
      }
    }

    onRemove(id) {
        return this.props.removeIngredient(id);
    }

    render() {
        // add isEdit property for each ingredient, when row selected set isEdit=true for that item.  Swap list item for editing one.
        return(<span>{this.props.ingredients.map(x => {
           return x.get('isEdit') 
           ? <ListItem style={styles.listItem} rightIconButton={
              <IconButton onClick={(e) => this.onRemove(x.get('id'))}>
                    <Remove />
            </IconButton>}>
            <TextField
                    value={x.get('ingredient')}
                    onChange={(e) => this.onUpdate(e, x.get('id'))}
                    onKeyDown={(e) => {this.onDone(e, x.get('id'))}}/>
              </ListItem> 
           : <ListItem style={styles.listItem}><TextField style={styles.textField}
                    value={x.get('ingredient')}
                    underlineShow={false}
                    onClick={(e) => this.onEdit(x.get('id'), true)}/>
                    </ListItem>})}
            </span>);
    }
}

var styles = {
    textField: {
        'width': '100%'
    },
    button: {

    },
    listItem: {
        'height': '10px'
    }
}