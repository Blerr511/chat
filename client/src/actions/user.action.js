import {userServices} from '../services/users.service';

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

export const SEARCH_FAKE_LOADING = 'SEARCH_FAKE_LOADING';

export const CLEAR_USERS_MESSAGES = 'CLEAR_USERS_MESSAGES';
// ---------------------------------------------------------- //

export const searchUsersFakeLoading = () => ({type: SEARCH_FAKE_LOADING});

export const clearUserMessages = () => ({type: CLEAR_USERS_MESSAGES});

export const searchUsers = (search, page = 0, limit = 20) => dispatch => {
	const request = () => {
		return {type: SEARCH_USERS_REQUEST};
	};
	const success = payload => {
		return {type: SEARCH_USERS_SUCCESS, payload};
	};
	const failure = error => {
		return {type: SEARCH_USERS_FAILURE, payload: error};
	};
	dispatch(request());
	userServices.search({search, page, limit}).then(
		data => dispatch(success(data)),
		error => dispatch(failure(error))
	);
};
