/* global __DEV__*/
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';
import createClientMiddleware from '../../middleware/clientMiddleware';

export default function configureStore(client) {
  return createStore(
    rootReducer,
      applyMiddleware(thunk, createClientMiddleware(client),
      loggerMiddleware({
        stateTransformer: (state) => {
          if (state.toJS) {
            return state.toJS();
          }

          return state;
        },
      }),
  ));
}
