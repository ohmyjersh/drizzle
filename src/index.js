import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {Provider} from 'react-redux';
import configureStore from './stores';
import {AppContainer} from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore();
store.dispatch({
    type: 'SET_STATE',
    state: {add:'',
      ingredients:[],
      recipes:[],
      page:0,
      recipe:0,
      error:''}});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
