import {handleResponse} from '../helpers/handleResponse';
import {authHeader} from '../helpers/headers';

const get = async () => {
	const requestInit = {
		method: 'GET',
		headers: {...authHeader()}
	};

	return await fetch(
		process.env.REACT_APP_API_CREATE_SERVER,
		requestInit
	).then(handleResponse);
};

const create = async (name, serverIcon) => {
	const body = new FormData();
	body.set('name', name);
	body.set('serverIcon', serverIcon);
	const requestInit = {
		method: 'POST',
		headers: {...authHeader()},
		body
	};

	return await fetch(
		process.env.REACT_APP_API_CREATE_SERVER,
		requestInit
	).then(handleResponse);
};

const createNewRoom = async (serverId, room) => {
	const body = new URLSearchParams();
	for (const k in room) {
		if (room.hasOwnProperty(k)) {
			const v = room[k];
			body.append(k, v);
		}
	}
	const requestInit = {
		method: 'POST',
		headers: {
			...authHeader(),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body
	};

	return await fetch(
		process.env.REACT_APP_API_CREATE_SERVER + `/${serverId}/newRoom`,
		requestInit
	)
		.then(handleResponse)
		.then(data => data);
};

export const serverServices = {
	get,
	create,
	createNewRoom
};
