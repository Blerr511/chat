import { Map } from "immutable";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    CLEAR_AUTH_MESSAGES,
} from "../actions/auth.action";
const initialState = Map({
    loggedIn: null,
    user: null,
    loading: false,
    error: null,
    message: null,
});

const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return state
                .set("loading", true)
                .set("message", null)
                .set("error", null);
        case LOGIN_SUCCESS:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("loggedIn", true);
                mutable.set("user", payload);
                return mutable;
            });
        case LOGIN_FAILURE:
            return state.withMutations((mutable) => {
                if (mutable.get("loggedIn") !== null)
                    mutable.set("error", payload);
                mutable.set("loading", false);
                mutable.set("loggedIn", false);
                return mutable;
            });
        case SIGNUP_REQUEST:
            return state
                .set("loading", true)
                .set("message", null)
                .set("error", null);
        case SIGNUP_SUCCESS:
            return state.set("loading", false).set("message", payload);
        case SIGNUP_FAILURE:
            return state.set("loading", false).set("error", payload);
        case CLEAR_AUTH_MESSAGES:
            return state.set("error", null).set("message", null);
        default:
            return state;
    }
};

export default auth;
