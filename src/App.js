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

class App extends Component {
  constructor() {
    super();
    this.state = {
      add:'',
      ingredients:[],
      recipes:[],
      page:0
    };
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
              let setRecipes = this.state.recipes.concat(json.results);
              this.setState({
                recipes:setRecipes,
                page: this.state.page + 1
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
      this.setState({add:'',
                      ingredients: [],
                      recipes:[]
                    });
    }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
      <AppBar
        showMenuIconButton={false}
        title="drizzle... because salad"
 />
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
            </ListItem>;
            })
          }
        </List>
        <CardActions>
          <FlatButton label="Clear" onClick={(e) => this.clearAll(e)}/>
          <FlatButton label="Search" disabled={this.state.ingredients.length > 0 ? false : true} onClick={(e) => this.getRecipes(e)}/>
        </CardActions>
        <List>
        {this.state.recipes.map(x => {
          return <ListItem disabled={true}>
                  <CardText><a href={x.href}>{x.title}</a></CardText>
                  <CardText>{x.ingredients}</CardText>
          </ListItem>;
        })}
        </List>
        <CardActions>
          <FlatButton label="Previous" />
          <FlatButton label="Next" />
        </CardActions>
        </Card>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
