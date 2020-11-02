import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    HIDE_MODAL,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const register = (name, email, password) => async dispatch => {
    let newUser = {
        name,
        email,
        password,
    };

    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = (email, password) => async dispatch => {
    let auth = {
        email,
        password,
    };

    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        const body = JSON.stringify(auth);

        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
    dispatch({
        type: HIDE_MODAL,
    });
};
