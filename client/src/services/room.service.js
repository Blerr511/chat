const {authHeader} = require('../helpers/headers');
const {handleResponse} = require('../helpers/handleResponse');
const {jsonToQueryParams} = require('../helpers/jsonToQueryParams');
const getMyRooms = async members => {
	const initRequest = {
		headers: {...authHeader()}
	};
	const data = await fetch(
		jsonToQueryParams(process.env.REACT_APP_ROOM, {members}),
		initRequest
	)
		.then(handleResponse)
		.then(data => data.data);
	return data;
};

export const roomServices = {
	getMyRooms
};

/**
 * Get my rooms
 * @callback getMyRooms
 */
