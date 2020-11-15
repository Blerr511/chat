import {jsonToQueryParams} from '../helpers/jsonToQueryParams';
import {handleResponse} from '../helpers/handleResponse';
import {authHeader} from '../helpers/headers';

export const auth = async (username, password) => {
	/**
	 * @type {RequestInit}
	 */
	const requestInit = {
		headers: {...authHeader()}
	};
	const data = await fetch(
		jsonToQueryParams(process.env.REACT_APP_LOGIN, {
			username,
			password
		}),
		requestInit
	)
		.then(handleResponse)
		.then(data => {
			localStorage.setItem('token', data.data?.token);
			return data.data;
		});
	return data;
};

export const signUp = async ({
	firstName,
	lastName,
	username,
	email,
	password
}) => {
	/**
	 * @type {RequestInit}
	 */
	const requestInit = {
		method: 'POST',
		body: JSON.stringify({
			firstName,
			lastName,
			username,
			email,
			password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const data = await fetch(process.env.REACT_APP_SIGN_UP, requestInit)
		.then(handleResponse)
		.then(data => {
			return data.message;
		});
	return data;
};
