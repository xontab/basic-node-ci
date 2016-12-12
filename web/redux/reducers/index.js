import { combineReducers } from 'redux-immutable';

import apps from './appsReducer';

const rootReducer = combineReducers({
  apps,
});

export default rootReducer;
