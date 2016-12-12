/* global __DEV__*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import createClientMiddleware from '../middleware/clientMiddleware';
import rootReducer from '../redux/reducers';

export default function configureStore(client) {
  const middlewareList = [
    thunk,
    createClientMiddleware(client),
  ];

  if (__DEV__) {
    middlewareList.push(
      loggerMiddleware({
        stateTransformer: state => (state.toJS ? state.toJS() : state),
      }),
    );
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middlewareList),
  );
}
