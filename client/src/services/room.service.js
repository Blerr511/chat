const { authHeader } = require("../helpers/headers");
const { handleResponse } = require("../helpers/handleResponse");

const getMyRooms = async () => {
    const initRequest = {
        headers: { ...authHeader() },
    };
    const data = await fetch(process.env.REACT_APP_ROOM, initRequest)
        .then(handleResponse)
        .then((data) => data.data);
    return data;
};

export const roomServices = {
    getMyRooms,
};

/**
 * Get my rooms
 * @callback getMyRooms
 */
