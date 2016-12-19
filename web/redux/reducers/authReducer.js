import Immutable from 'immutable';

import {
  FETCH_LOGIN,
  SUCCESS_LOGIN,
  FAILED_LOGIN,
  SUCCESS_LOGOUT,
} from '../actions/authActions';

const DefaultState = Immutable.Record({
  accessToken: localStorage.accessToken || '',
  isFetching: false,
  error: null,
  receivedAt: null,
});

const initialState = new DefaultState();

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_LOGOUT:
    case FETCH_LOGIN:
      localStorage.removeItem('accessToken');
      return state.merge({ isFetching: true, accessToken: '' });

    case SUCCESS_LOGIN:
      localStorage.accessToken = action.result.token;
      return state.merge({ isFetching: false, accessToken: action.result.token, receivedAt: action.receivedAt });

    case FAILED_LOGIN:
      return state.merge({ isFetching: false, error: 'Server Error' });

    default:
      return state;
  }
}
