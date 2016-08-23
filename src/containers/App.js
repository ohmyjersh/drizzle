import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card,CardHeader, CardMedia, CardActions} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RecipeResults from '../components/RecipeResults';
import IngredientsList from '../components/IngredientsList';
import logo from '../images/drizzle.png';
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

  previousRecipes() {
      return this.props.previousRecipes();
    }

  nextRecipes() {
    console.log(this.props.recipe <= this.props.page);
    if(this.props.recipe < this.props.page){
      return this.props.nextRecipes();
    }
    else {
      this.getRecipes();
    }
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
      <Card>
        <CardMedia>
          <img src={logo}/>
          </CardMedia>
        <TextField
          value={this.props.add}
          onChange={e => this.props.updateAdd(e.target.value)}
          underlineShow={false}
          hintText="Add Ingredient" 
          onKeyDown={(e) => this.addIngredient(e)}/>;
        <IngredientsList {...this.props}/>
        <CardActions>
          <FlatButton label="Clear" disabled={this.props.ingredients.size === 0 
                                                ? true 
                                                : false}  
                                                onClick={(e) => this.props.clearAll()}/>
          <FlatButton label="Search" disabled={this.props.ingredients.size === 0 
                                                || this.props.results.size > 0
                                                ? true 
                                                : false} 
                                    onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        <RecipeResults {...this.props}/>
        <CardActions>
          <FlatButton label="Previous" disabled={this.props.results.size === 0
                                                || this.props.recipe === 1
                                                || this.props.isFetching 
                                                ? true 
                                                : false} 
                                        onClick={(e) => this.previousRecipes(e)}/>
          <FlatButton label="Next" disabled={this.props.results.size === 0
                                            || this.props.isFetching
                                            ? true
                                            : false}
                                          onClick={(e) => this.nextRecipes(e)}/>
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
    error:state.get('error'),
    isFetching:state.get('isFetching')
  };
}

export const AppContainer = connect(mapStateToProps, actions)(App);