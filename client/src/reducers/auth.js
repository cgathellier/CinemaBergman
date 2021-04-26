import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../actions/types';

class Storage {
	setItem(name, payload) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					localStorage.setItem(name, payload);
					resolve('');
				} catch (error) {
					reject(new Error('Une erreur est survenue'));
				}
			}, 1);
		});
	}

	removeItem(name) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					localStorage.removeItem(name);
					resolve('');
				} catch (error) {
					reject(new Error('Une erreur est survenue'));
				}
			}, 1);
		});
	}
}

const storage = new Storage();

const initialState = {
	token: localStorage.getItem('token'),
	name: null,
	isAdmin: false,
	_id: null,
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				...payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				name: null,
				isAdmin: false,
				_id: null,
			};
		default:
			return state;
	}
}
