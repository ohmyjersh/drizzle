import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle';

export default class IngredientItem extends Component {
    constructor(props)
    {
        super();
        this.state = props.state;
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
    
    onEdit(e){
        console.log(e);
    }

    onRemove(e) {

    }

    render() {
        // add isEdit property for each ingredient, when row selected set isEdit=true for that item.  Swap list item for editing one.
        return(<span>{this.state.ingredients.map(x => {
            var ingred = this.state.ingredients[0];
            console.log(ingred);
           return x.isEdit 
           ? <ListItem rightIconButton={
              <IconButton>
                    <Remove />
            </IconButton>} primaryText={x.ingredient}/> 
           : <ListItem><TextField
                    value={x.ingredient}
                    //onChange={e => this.setState({ ingred: {ingredient: e.target.value }})}
                    onChange={(e) => {
                        console.log(e.target.value);
                        this.setState({ ingred: {ingredient: e.target.value }})}}
                    ref="addIngredients" 
                    underlineShow={false}
                    hintText="Add Ingredient" onKeyDown={(e) => this.onEdit(e)}/></ListItem>})}</span>);
    }
}