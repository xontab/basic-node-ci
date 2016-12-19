import Immutable from 'immutable';

import {
  FETCH_LOGS,
  SUCCESS_LOGS,
  FAILED_LOGS,
} from '../actions/logsActions';

const DefaultState = Immutable.Record({
    apps: Immutable.fromJS({}),
});

const initialState = new DefaultState();

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGS:
      return state.mergeIn(['apps', action.id], { isFetching: true });

    case SUCCESS_LOGS:
      return state.mergeIn(['apps', action.id], { isFetching: false, data: Immutable.fromJS(action.result), receivedAt: action.receivedAt });

    case FAILED_LOGS:
      return state.mergeIn(['apps', action.id], { isFetching: false, error: 'Server Error' });

    default:
      return state;
  }
}
