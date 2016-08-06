import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

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
      recipe:0
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.addIngredient = this.addIngredient.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes(e) {
    let ingredientsStr = this.state.ingredients.join(',');
    var page = 1;
    fetch(`http://www.recipepuppy.com/api/?i=${ingredientsStr}&q=salad%20dressing&p=${this.state.page + 1}`, { method: 'GET',
               cache: 'default' })
            .then(response => response.json())
            .then((json) => {
              var newArray = this.state.recipes.slice();  
              newArray.push(json.results);
              JSON.stringify(newArray);
              this.setState({
                recipes:newArray,
                page: this.state.page + 1,
              });
            });
  }

  addIngredient(e) {
      if (e.key === 'Enter' && e.target.value !== '') {
        var newArray = this.state.ingredients.slice();    
        newArray.push(e.target.value);
        this.setState({
          ingredients:newArray,
          add: ''
        });
      }
    }

    clearAll() {
      this.setState(initialState);
    }
    goNext() {
      let nextRecipe = this.state.recipe + 1;
      if(this.state.recipes[nextRecipe] === null || this.state.recipes[nextRecipe] === undefined)
      {
        console.log('no recipes, go get some');
        this.getRecipes();
      }
      this.setState({
        recipe: nextRecipe
      });
    }

    goBack() {
      this.setState({
        recipe: this.state.recipe - 1
      });
    }

  render() {
    var thing;
    if(this.state.recipes.length > 0 && this.state.recipes[this.state.recipe] !== undefined)
    {
        thing = <List>
            {this.state.recipes[this.state.recipe].map(x => {
              return <ListItem disabled={true}>
                      <CardText><a href={x.href}>{x.title}</a></CardText>
                      <CardText>{x.ingredients}</CardText>
              </ListItem>;
            })}
            </List>;
    }
    else {
      thing = <List></List>
    }
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
        <List>
          {this.state.ingredients.map(x => {
          return <ListItem>
                    <TextField 
                      value={x}                    
                      underlineShow={false}/>
            </ListItem>;})}
        </List>
        <CardActions>
          <FlatButton label="Clear" onClick={(e) => this.clearAll(e)}/>
          <FlatButton label="Search" disabled={this.state.ingredients.length > 0 ? false : true} onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        {thing}
        <CardActions>
          <FlatButton label="Previous" onClick={(e) => this.goBack(e)}/>
          <FlatButton label="Next" onClick={(e) => this.goNext(e)}/>
        </CardActions>
        </Card>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
