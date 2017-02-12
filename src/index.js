import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AppReducer from './reducers'
import AppContainer from './containers/AppContainer';
import './index.css';

const loggerMiddleware = createLogger();

let store = createStore(
	AppReducer,
	applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

document.onunload = () => {
	ReactDOM.unmountComponentAtNode(document.getElementById('root'));
};
