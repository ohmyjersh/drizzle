import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions} from 'material-ui/Card';
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
    var ingredientsArr = this.props.ingredients.map(x => { return x.get('ingredient')})
    var ingredientsStr = ingredientsArr.join(',');
    return this.props.getRecipes(ingredientsStr, this.props.page);
  }

  addIngredient(e) {
      if (e.key === 'Enter' && e.target.value !== '') {
        return this.props.addIngredient(e.target.value);
      }
    }

  goBack() {
      return this.props.previousRecipes();
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
          hintText="Add Ingredient" 
          onKeyDown={(e) => this.addIngredient(e)}/>;
        <IngredientsList {...this.props}/>
        <CardActions>
          <FlatButton label="Clear" disabled={(this.props.ingredients.size === 0 
                                                || this.props.results.size) > 0 
                                                ? true 
                                                : false}  
                                                onClick={(e) => this.props.clearAll()}/>
          <FlatButton label="Search" disabled={(this.props.ingredients.size === 0 
                                                || this.props.results.size) > 0 
                                                ? true 
                                                : false} 
                                    onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        <RecipeResults {...this.props}/>
        <CardActions>
          <FlatButton label="Previous" disabled={this.props.recipe === 0 
                                                ? true 
                                                : false} 
                                        onClick={(e) => this.goBack(e)}/>
          <FlatButton label="Next" disabled={this.props.results.size === 0} onClick={(e) => this.getRecipes(e)}/>
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
    results:state.get('results'),
    page:state.get('page'),
    recipe:state.get('recipe'),
    error:state.get('error')
  };
}

export const AppContainer = connect(mapStateToProps, actions)(App);