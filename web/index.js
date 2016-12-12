import 'babel-polyfill';

import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import ApiClient from './helpers/ApiClient';
import configureStore from './store/configureStore';

import Layout from './layout';
import DashboardPage from './views/DashboardPage';
import AboutPage from './views/AboutPage';

const client = new ApiClient('http://localhost:3000/api');
const store = configureStore(client);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={DashboardPage} />
        <Route path="about" component={AboutPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
