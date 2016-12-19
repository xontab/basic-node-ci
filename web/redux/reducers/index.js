import { combineReducers } from 'redux-immutable';

import auth from './authReducer';
import apps from './appsReducer';
import logs from './logsReducer';

const rootReducer = combineReducers({
  auth,
  apps,
  logs,
});

export default rootReducer;
