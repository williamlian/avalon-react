/*
Avalon - A Board Game. Frontend.
Copyright (C) 2017 Boshu Lian

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import '../node_modules/grommet/grommet.min.css';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AppReducer from './reducers'
import AppContainer from './containers/AppContainer';
import './index.css';
import { loadCookie, unsubscribe } from './actions'
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

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
    <App>
      <Article>
        <Header>
          <Title>Sample Title</Title>
        </Header>
        <AppContainer />
      </Article>
    </App>
  </Provider>,
  document.getElementById('root')
);

store.dispatch(loadCookie());

window.onbeforeunload = () => {
	store.dispatch(unsubscribe());
};
