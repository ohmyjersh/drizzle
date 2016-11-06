import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import { Card, CardMedia, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RecipeResults from '../components/RecipeResults';
import IngredientsList from '../components/IngredientsList';
import Snackbar from 'material-ui/Snackbar';
import logo from '../images/drizzle.png';
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

var styles = {
  container: {
    'width': '650px',
    'margin': '0 auto'
  },
  logo: {
    'height': '225px'
  },
  ingredientSearch: { paddingLeft: '20px', paddingRight: '20px', width: '93.9%' },
  buttons: { textAlign: 'center' }
}


class App extends Component {
  hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

  getRecipes(e) {
    var ingredientsArr = this.props.ingredients.map(x => { return x.get('ingredient') })
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
    if (this.props.recipe < this.props.page) {
      return this.props.nextRecipes();
    }
    else {
      this.getRecipes();
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App" style={styles.container}>
          <Card>
            <CardMedia style={styles.cardMedia}>
              <img src={logo} style={styles.logo} alt="logo" />
            </CardMedia>
            <TextField
              disabled={this.props.results.size > 0 ? true : false}
              style={styles.ingredientSearch}
              value={this.props.add}
              onChange={e => this.props.updateAdd(e.target.value)}
              underlineShow={false}
              hintText={this.props.results.size > 0 ? "Clear results to search again..." : "Add Ingredient"}
              fullWidth={true}
              onKeyDown={(e) => this.addIngredient(e)} />;
        <IngredientsList {...this.props} />
            <CardActions style={styles.buttons}>
              <FlatButton label="Clear" disabled={this.props.ingredients.size < 1
                ? true
                : false}
                onClick={(e) => this.props.clearAll()} />
              <div style={{ width: '100px', height: 'auto', display: 'inline-block' }} />
              <FlatButton primary={true} label="Search" disabled={this.props.ingredients.size < 1
                || this.props.results.size > 0
                ? true
                : false}
                onClick={(e) => this.getRecipes(e)} />
            </CardActions>
            { this.props.results.size > 0 ? 
            <div>
            <RecipeResults {...this.props} />
            <CardActions style={styles.buttons}>
              <FlatButton secondary={true} label="Previous" disabled={this.props.results.size < 1
                || this.props.recipe === 1
                || this.props.isFetching
                ? true
                : false}
                onClick={(e) => this.previousRecipes(e)} />
              <div style={{ width: '100px', height: 'auto', display: 'inline-block' }} />
              <FlatButton secondary={true} label="Next" disabled={this.props.results.size < 1
                || this.props.isFetching || this.props.results.toJS()[this.props.recipe -1].length < 10
                ? true
                : false}
                onClick={(e) => this.nextRecipes(e)} />
            </CardActions> </div> : null }
          </Card>
          <Snackbar
            open={this.props.error ? true : false}
            message={this.props.error}
            autoHideDuration={4000}
            onRequestClose={() => this.props.setError('')}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    add: state.get('add'),
    ingredients: state.get('ingredients'),
    results: state.get('results'),
    page: state.get('page'),
    recipe: state.get('recipe'),
    error: state.get('error'),
    isFetching: state.get('isFetching')
  };
}

export const AppContainer = connect(mapStateToProps, actions)(App);