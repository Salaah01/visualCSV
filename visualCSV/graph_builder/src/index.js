// IMPORTS
// Third Party Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Local Imports
import '../../visualCSV/static/sass/components/_dropdown_menu.scss';
import App from './App';
import graphDataReducer from './store/reducers/graphData';
import graphOptionsReducer from './store/reducers/graphOptions';
import DropdownMenu from '../../visualCSV/static/ts/dropdown_menu';

const composeEnhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  graphData: graphDataReducer,
  graphOptions: graphOptionsReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

new DropdownMenu();
