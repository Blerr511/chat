import { Map } from "immutable";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
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
            return state.set("loading", true);
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
        default:
            return state;
    }
};

export default auth;
