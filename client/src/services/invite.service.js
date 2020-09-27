import { handleResponse } from "../helpers/handleResponse";
import { authHeader } from "../helpers/headers";
/**
 * @param {Object} params
 * @param {String} params.serverId - serverId
 * @param {Number} [params.expiresIn] - expiration date in seconds , or undefined for unlimited
 * @param {Number} [params.useCount] - maximum use count of token , undefined - infinite
 */
const generate = async ({ serverId, expiresIn, useCount }) => {
    /**
     * @type {RequestInit}
     */
    const requestInit = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({
            serverId,
            expiresIn,
            useCount,
        }),
    };

    return await fetch(
        process.env.REACT_APP_API_TOKEN + "/generate",
        requestInit
    ).then(handleResponse);
};

const getInvite = async (token) => {
    /**
     * @type {RequestInit}
     */
    const requestInit = {
        method: "GET",
        headers: { ...authHeader() },
    };

    return await fetch(
        process.env.REACT_APP_API_TOKEN + "/check" + "?invite=" + token,
        requestInit
    ).then(handleResponse);
};

const joinToServer = async ({ serverId, token }) => {
    const requestInit = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({
            token,
        }),
    };

    return await fetch(
        process.env.REACT_APP_API_CREATE_SERVER + `/${serverId}/join`,
        requestInit
    ).then(handleResponse);
};

export const inviteServices = {
    generate,
    getInvite,
    joinToServer,
};
