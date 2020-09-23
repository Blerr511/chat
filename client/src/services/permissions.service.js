const { authHeader } = require("../helpers/headers");
const { handleResponse } = require("../helpers/handleResponse");
const getRoles = async () => {
    const initRequest = {
        headers: { ...authHeader() },
    };
    const data = await fetch(process.env.REACT_APP_API_PERMISSIONS, initRequest)
        .then(handleResponse)
        .then((data) => data.data);
    return data;
};

const getPermissions = async (role) => {
    const initRequest = {
        headers: { ...authHeader() },
    };
    const data = await fetch(
        process.env.REACT_APP_API_PERMISSIONS + `/${role}`,
        initRequest
    )
        .then(handleResponse)
        .then((data) => data.data);

    return data;
};

export const permissionsServices = {
    getRoles,
    getPermissions,
};
