import {handleResponse} from '../helpers/handleResponse';
import {authHeader} from '../helpers/headers';

export const auth = async (username, password) => {
	/**
	 * @type {RequestInit}
	 */
	const requestInit = {
		method: 'POST',
		headers: {
			...authHeader(),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password
		})
	};
	const data = await fetch(process.env.REACT_APP_LOGIN, requestInit)
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
