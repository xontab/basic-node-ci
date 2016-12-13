import { combineReducers } from 'redux-immutable';

import apps from './appsReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  apps,
  auth,
});

export default rootReducer;
