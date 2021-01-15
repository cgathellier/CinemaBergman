import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import modal from './modal';
import films from './films';

export default combineReducers({
	alert,
	auth,
	modal,
	films,
});
