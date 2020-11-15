import {permissionsServices} from '../services/permissions.service';

export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAILURE = 'GET_ROLES_FAILURE';

export const _getRoles = () => dispatch => {
	const request = () => {
		return {type: GET_ROLES_REQUEST};
	};
	const success = payload => {
		return {type: GET_ROLES_SUCCESS, payload};
	};
	const failure = error => {
		return {type: GET_ROLES_FAILURE, payload: error};
	};
	dispatch(request());
	permissionsServices.getRoles().then(
		data => dispatch(success(data)),
		error => dispatch(failure(error))
	);
};
