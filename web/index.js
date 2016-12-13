import 'babel-polyfill';

import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import ApiClient from './helpers/ApiClient';
import configureStore from './store/configureStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  cyan500,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import { logout } from './redux/actions/authActions';

import Layout from './layout';
import DashboardPage from './views/DashboardPage';
import AboutPage from './views/AboutPage';
import LoginPage from './views/LoginPage';

const client = new ApiClient('http://localhost:3000/api', () => store.getState().getIn(['auth', 'accessToken']));
const store = configureStore(client);

const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

function _redirectToLogin(nextState, replaceState) {
  if (store.getState().getIn(['auth', 'accessToken']).length === 0) {
    replaceState('login');
  }
}

function _redirectToDashboard(nextState, replaceState) {
  if (store.getState().getIn(['auth', 'accessToken']).length > 0) {
    replaceState('/');
  }
}

function _handleLogout(nextState, replaceState) {
  store.dispatch(logout()).then(() => {
    browserHistory.push('login');
  });
}

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="login" component={LoginPage} onEnter={_redirectToDashboard} />
        <Route path="logout" onEnter={_handleLogout} />
        <Route path="/" component={Layout} onEnter={_redirectToLogin}>
          <IndexRoute component={DashboardPage} />
          <Route path="about" component={AboutPage} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
