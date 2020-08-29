import { authWithCredentials } from "../services/auth.service";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
// ---------------------------------------------------------- //

// ---------------------------------------------------------- //

export const login = (username, password) => (dispatch) => {
    const request = () => {
        return { type: LOGIN_REQUEST };
    };
    const success = (payload) => {
        return { type: LOGIN_SUCCESS, payload };
    };
    const failure = (error) => {
        return { type: LOGIN_FAILURE, payload: error };
    };

    dispatch(request());
    authWithCredentials(username, password).then(
        (data) => dispatch(success(data)),
        (error) => dispatch(failure(error))
    );
};
