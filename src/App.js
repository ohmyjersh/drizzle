import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RecipeResults from './components/RecipeResults';
import IngredientsList from './components/IngredientsList';

// rxjs state container

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const initialState = {
      add:'',
      ingredients:[],
      recipes:[],
      page:0,
      recipe:0,
      error:''
}
export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  getRecipes(e) {
    let ingredientsStr = this.state.ingredients.ingredient.join(',');
    console.log(ingredientsStr);
    fetch(`http://www.recipepuppy.com/api/?i=${ingredientsStr}&q=salad%20dressing&p=${this.state.page + 1}`, { method: 'GET',
               cache: 'default' })
            .then(response => response.json())
            .then((json) => {
              if(json.results.length === 0) {
                console.log('error');
                this.setState({error: 'no recipes found'});
              }
              else {
                var recipe = this.state.recipe;
                if(this.state.recipes.length > 0){ recipe += 1;}
                var newArray = this.state.recipes.slice();  
                newArray.push(json.results);
                this.setState({
                  recipes:newArray,
                  page: this.state.page + 1,
                  recipe: recipe
                });
                console.log(this.state);
              }
            });
  }

  addIngredient(e) {
      if (e.key === 'Enter' && e.target.value !== '') {
        if(!this.state.ingredients.includes(e.target.value)){  
          var newArray = this.state.ingredients.slice();    
          newArray.push({id:1,
            ingredient:e.target.value,
            isEdit: false});
          this.setState({
            ingredients:newArray,
            add: ''
          });
        }
        else {
          this.setState({
            add:'',
            error: 'already have that one!'}
            );
        }
      }
    }
  //  addIngredient(e) {
  //     if (e.key === 'Enter' && e.target.value !== '') {

  //       }
  //   }

  clearAll() {
      this.setState(initialState);
    }

  goBack() {
      this.setState({
        recipe: this.state.recipe - 1
      });
    }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
      <AppBar
        showMenuIconButton={false}
        title="drizzle... because salad"/>
        <Card>
        <TextField
          value={this.state.add}
          onChange={e => this.setState({ add: e.target.value })}
          ref="addIngredients" 
          underlineShow={false}
          hintText="Add Ingredient" onKeyDown={(e) => this.addIngredient(e)}/>;
        <IngredientsList state={this.state}/>
        <CardActions>
          <FlatButton label="Clear" onClick={(e) => this.clearAll(e)}/>
          <FlatButton label="Search" disabled={(this.state.ingredients.length === 0 || this.state.recipes.length) > 0 ? true : false} onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        <RecipeResults state={this.state} />
        <CardActions>
          <FlatButton label="Previous" disabled={this.state.recipes.length === 0 || this.state.recipe === 0 ? true : false} onClick={(e) => this.goBack(e)}/>
          <FlatButton label="Next" disabled={this.state.recipes.length === 0} onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        </Card>
      </div>
      </MuiThemeProvider>
    );
  }
}
