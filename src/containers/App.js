import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import {connect} from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RecipeResults from '../components/RecipeResults';
import IngredientsList from '../components/IngredientsList';

// rxjs state container

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor(props) {
    super();
  }

  getRecipes(e) {
    let ingredientsStr = this.state.ingredients.ingredient.join(',');
    console.log(ingredientsStr);
    fetch(`http://www.recipepuppy.com/api/?i=${ingredientsStr}&q=salad%20dressing&p=${this.state.page + 1}`, { method: 'GET',
               cache: 'default' })
            .then(response => response.json())
            .then((json) => {
              if(json.results.length === 0) {
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
              }
            });
  }

  addIngredient(e) {
      if (e.key === 'Enter' && e.target.value !== '') {
        this.props.resetAdd();
        return this.props.addIngredient(e.target.value);
      }
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
          value={this.props.add}
          onChange={e => this.props.updateAdd(e.target.value)}
          underlineShow={false}
          hintText="Add Ingredient" onKeyDown={(e) => this.addIngredient(e)}/>;
        <IngredientsList {...this.props}/>
        <CardActions>
          <FlatButton label="Clear" onClick={(e) => this.props.clearAll()}/>
          <FlatButton label="Search" disabled={(this.props.ingredients.length === 0 || this.props.recipes.length) > 0 ? true : false} onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        <RecipeResults state={this.props} />
        <CardActions>
          <FlatButton label="Previous" disabled={this.props.recipes.length === 0 || this.props.recipe === 0 ? true : false} onClick={(e) => this.goBack(e)}/>
          <FlatButton label="Next" disabled={this.props.recipes.length === 0} onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        </Card>
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    add:state.get('add'),
    ingredients:state.get('ingredients'),
    recipes:state.get('recipes'),
    page:state.get('page'),
    recipe:state.get('recipe'),
    error:state.get('error')
  };
}

export const AppContainer = connect(mapStateToProps, actions)(App);