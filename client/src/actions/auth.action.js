import {auth, signUp} from '../services/auth.service';
import {socketAuthAction} from './socket.action';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
// ---------------------------------------------------------- //
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
// ---------------------------------------------------------- //
export const CLEAR_AUTH_MESSAGES = 'CLEAR_AUTH_MESSAGES';
// ---------------------------------------------------------- //

export const _clearAuthMessages = () => ({type: CLEAR_AUTH_MESSAGES});

export const _signUp = ({
	firstName,
	lastName,
	username,
	email,
	password
}) => dispatch => {
	const request = () => {
		return {type: SIGNUP_REQUEST};
	};
	const success = payload => {
		return {type: SIGNUP_SUCCESS, payload};
	};
	const failure = error => {
		return {type: SIGNUP_FAILURE, payload: error};
	};
	dispatch(request());
	return signUp({firstName, lastName, username, email, password}).then(
		data => dispatch(success(data)),
		error => dispatch(failure(error))
	);
};

export const _login = (username, password) => dispatch => {
	const request = () => {
		return {type: LOGIN_REQUEST};
	};
	const success = payload => {
		return {type: LOGIN_SUCCESS, payload};
	};
	const failure = error => {
		return {type: LOGIN_FAILURE, payload: error};
	};

	dispatch(request());
	return auth(username, password).then(
		async data => {
            await dispatch(socketAuthAction(data.token));
            dispatch(success(data));
		},
		error => dispatch(failure(error))
	);
};
