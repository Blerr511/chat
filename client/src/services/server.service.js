import { handleResponse } from "../helpers/handleResponse";
import { authHeader } from "../helpers/headers";

const get = async () => {
    const requestInit = {
        method: "GET",
        headers: { ...authHeader() },
    };

    return await fetch(
        process.env.REACT_APP_API_CREATE_SERVER,
        requestInit
    ).then(handleResponse);
};

const create = async (name, serverIcon) => {
    const body = new FormData();
    body.set("name", name);
    body.set("serverIcon", serverIcon);
    const requestInit = {
        method: "POST",
        headers: { ...authHeader() },
        body,
    };

    return await fetch(
        process.env.REACT_APP_API_CREATE_SERVER,
        requestInit
    ).then(handleResponse);
};

export const serverServices = {
    get,
    create,
};
