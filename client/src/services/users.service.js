import {authHeader} from '../helpers/headers';
import {jsonToQueryParams} from '../helpers/jsonToQueryParams';
import {handleResponse} from '../helpers/handleResponse';

const search = async ({search, page = 0, limit = 50}) => {
	const initRequest = {
		headers: {...authHeader()}
	};
	const data = await fetch(
		jsonToQueryParams(process.env.REACT_APP_USERS, {search, page, limit}),
		initRequest
	)
		.then(handleResponse)
		.then(data => data.data);
	return data;
};

export const userServices = {
	search
};
