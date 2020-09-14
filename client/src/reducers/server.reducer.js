import { fromJS, List, Map } from "immutable";
import {
    CREATE_SERVER_FAILURE,
    CREATE_SERVER_REQUEST,
    CREATE_SERVER_SUCCESS,
    GET_SERVERS_FAILURE,
    GET_SERVERS_REQUEST,
    GET_SERVERS_SUCCESS,
    RESET_SERVER_MESSAGES,
} from "../actions/server.action";

const initialState = Map({
    list: List(),
    current: {},
    message: null,
    error: null,
    loading: false,
});

const server = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_SERVERS_REQUEST:
            return state.set("loading", true);
        case GET_SERVERS_SUCCESS:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("list", fromJS(payload.data));
                return mutable;
            });
        case GET_SERVERS_FAILURE:
            return state.set("loading", false).set("error", payload.message);
        case RESET_SERVER_MESSAGES:
            return state.set("error", null).set("message", null);
        case CREATE_SERVER_REQUEST:
            return state.set("loading", true);
        case CREATE_SERVER_SUCCESS:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("message", payload.message);
                mutable.setIn(
                    ["list", mutable.get("list").size],
                    fromJS(payload.data)
                );
                return mutable;
            });
        case CREATE_SERVER_FAILURE:
            return state.set("loading", false).set("error", payload.message);
        default:
            return state;
    }
};

export default server;
