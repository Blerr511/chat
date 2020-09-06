import { List, fromJS, Map } from "immutable";
import {
    SEARCH_USERS_REQUEST,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAILURE,
    CLEAR_USERS_MESSAGES,
    SEARCH_FAKE_LOADING,
} from "../actions/user.action";
const initialState = Map({
    error: null,
    message: null,
    loading: null,
    data: List([]),
});

const users = (state = initialState, { type, payload }) => {
    switch (type) {
        case SEARCH_USERS_REQUEST:
            return state.set("loading", true);
        case SEARCH_USERS_SUCCESS:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("data", fromJS(payload));
                mutable.set("error", null);
                return mutable;
            });
        case SEARCH_USERS_FAILURE:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("error", String(payload));
                mutable.set("data", List([]));
                mutable.set("message", null);
                return mutable;
            });
        case SEARCH_FAKE_LOADING:
            return state.set("loading", true);
        case CLEAR_USERS_MESSAGES:
            return state.set("error", null).set("message".null);
        default:
            return state;
    }
};

export default users;
