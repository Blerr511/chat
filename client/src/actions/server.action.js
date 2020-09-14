import { serverServices } from "../services/server.service";

export const GET_SERVERS_REQUEST = "GET_SERVERS_REQUEST";
export const GET_SERVERS_SUCCESS = "GET_SERVERS_SUCCESS";
export const GET_SERVERS_FAILURE = "GET_SERVERS_FAILURE";
export const RESET_SERVER_MESSAGES = "RESET_SERVER_MESSAGES";

export const clearServerMessages = () => ({ type: RESET_SERVER_MESSAGES });

export const getServers = () => (dispatch) => {
    const request = () => {
        return { type: GET_SERVERS_REQUEST };
    };
    const success = (payload) => {
        return { type: GET_SERVERS_SUCCESS, payload };
    };
    const failure = (error) => {
        return { type: GET_SERVERS_FAILURE, payload: error };
    };
    dispatch(request());
    serverServices.get().then(
        (data) => dispatch(success(data)),
        (error) => dispatch(failure(error))
    );
};

export const CREATE_SERVER_REQUEST = "CREATE_SERVER_REQUEST";
export const CREATE_SERVER_SUCCESS = "CREATE_SERVER_SUCCESS";
export const CREATE_SERVER_FAILURE = "CREATE_SERVER_FAILURE";

export const createServer = (name, serverIcon) => (dispatch) => {
    const request = () => {
        return { type: CREATE_SERVER_REQUEST };
    };
    const success = (payload) => {
        return { type: CREATE_SERVER_SUCCESS, payload };
    };
    const failure = (error) => {
        return { type: CREATE_SERVER_FAILURE, payload: error };
    };
    dispatch(request());
    serverServices.create(name, serverIcon).then(
        (data) => dispatch(success(data)),
        (error) => dispatch(failure(error))
    );
};
