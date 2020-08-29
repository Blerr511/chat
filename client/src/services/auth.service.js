import { jsonToQueryParams } from "../helpers/jsonToQueryParams";
import { handleResponse } from "../helpers/handleResponse";
import { authHeader } from "../helpers/headers";

export const authWithCredentials = async (username, password) => {
    /**
     * @type {RequestInit}
     */
    const requestInit = {
        headers: { ...authHeader() },
    };
    const data = await fetch(
        jsonToQueryParams(process.env.REACT_APP_LOGIN, {
            username,
            password,
        }),
        requestInit
    )
        .then(handleResponse)
        .then((data) => {
            localStorage.setItem("token",data.data?.token)
            return data.data;
        });
    return data;
};
