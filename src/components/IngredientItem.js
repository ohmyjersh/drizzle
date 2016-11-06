import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
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

    onDone(e, id) {
        if (e.key === 'Enter' && e.target.value !== '') {
            return this.onEdit(id, false);
        }
    }

    onRemove(id) {
        return this.props.removeIngredient(id);
    }

    render() {
        // add isEdit property for each ingredient, when row selected set isEdit=true for that item.  Swap list item for editing one.
        return (<div>{this.props.ingredients.map(x => {
            return x.get('isEdit')
                ? <ListItem key={x.get('id')}
                    innerDivStyle={{padding:'0px 0px 0px 0px'}}
                    rightIconButton={
                        <IconButton onClick={(e) => this.onRemove(x.get('id'))}>
                            <Remove />
                        </IconButton>}>
                    <TextField
                        style={{ paddingLeft: '20px', paddingRight: '20px', width: '93.9%' }}
                        disabled={this.props.results.size > 0
                            ? true
                            : false}
                        fullWidth={true}
                        value={x.get('ingredient')}
                        onChange={(e) => this.onUpdate(e, x.get('id'))}
                        onKeyDown={(e) => { this.onDone(e, x.get('id')) } } />
                </ListItem>
                : <ListItem key={x.get('id')}
                    innerDivStyle={{padding:'0px 0px 0px 0px'}}>
                    <TextField
                        style={{ paddingLeft: '20px', paddingRight: '20px', width: '93.9%' }}
                        disabled={this.props.results.size > 0
                            ? true
                            : false}
                        fullWidth={true}
                        value={x.get('ingredient')}
                        underlineShow={false}
                        onClick={(e) => this.onEdit(x.get('id'), true)} />
                </ListItem>
        })}
        </div>);
    }
}
