import Immutable from 'immutable';

import {
  FETCH_APPS,
  SUCCESS_APPS,
  FAILED_APPS,
  FETCH_EXECUTE_APPS,
  SUCCESS_EXECUTE_APPS,
  FAILED_EXECUTE_APPS,
} from '../actions/appsActions';

const DefaultState = Immutable.Record({
  data: Immutable.List(),
  isFetching: false,
  error: null,
});

const initialState = new DefaultState();

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPS:
      return state.merge({ isFetching: true });

    case SUCCESS_APPS:
      return state.merge({ isFetching: false, data: Immutable.fromJS(action.result) });

    case FAILED_APPS:
      return state.merge({ isFetching: false, error: 'Server Error' });

    case FETCH_EXECUTE_APPS:
      const index = state.get('data').findIndex(x => x.get('id') === action.id);
      return state.mergeIn(['data', index], {
        status: 3,
      })

    default:
      return state;
  }
}
