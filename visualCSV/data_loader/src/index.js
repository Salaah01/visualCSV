// IMPORTS
// Third Party Imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

// Local Imports
import App from "./App";
import "../../sharedJsComponents/UI/icons/icons.scss";
import filesReducer from "./store/reducers/files";

const composeEnhancer =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  files: filesReducer,
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
