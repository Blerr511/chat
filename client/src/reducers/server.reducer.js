import { fromJS, List, Map } from "immutable";
import {
    CREATE_SERVER_FAILURE,
    CREATE_SERVER_REQUEST,
    CREATE_SERVER_ROOM_FAILURE,
    CREATE_SERVER_ROOM_REQUEST,
    CREATE_SERVER_ROOM_SUCCESS,
    CREATE_SERVER_SUCCESS,
    GET_SERVERS_FAILURE,
    GET_SERVERS_REQUEST,
    GET_SERVERS_SUCCESS,
    RESET_SERVER_MESSAGES,
    SERVER_SET_ACTIVE_CHANNEL,
} from "../actions/server.action";
import { socketActions } from "../actions/socket.action";

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
                mutable.set(
                    "list",
                    fromJS(payload.data).map((el) => el.set("activeRoom", 0))
                );
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
                    fromJS(payload.data).set("activeRoom", 0)
                );
                return mutable;
            });
        case CREATE_SERVER_FAILURE:
            return state.set("loading", false).set("error", payload.message);
        case CREATE_SERVER_ROOM_REQUEST:
            return state.set("loading", true);
        case CREATE_SERVER_ROOM_SUCCESS:
            return state.set("message", payload.message).set("loading", false);
        case CREATE_SERVER_ROOM_FAILURE:
            return state.set("loading", false).set("error", payload);
        case SERVER_SET_ACTIVE_CHANNEL:
            return state.setIn(
                [
                    "list",
                    state
                        .get("list")
                        .findIndex((v) => v.get("_id") === payload.serverId),
                    "activeRoom",
                ],
                payload.index
            );
        ///SOCKET ACTIONS

        case socketActions.SERVER_MESSAGE_RECEIVED.type:
            return state.withMutations((mutable) => {
                const serverIndex = mutable
                    .get("list")
                    .findIndex((v) => v.get("_id") === payload.serverId);
                const roomIndex = mutable
                    .getIn(["list", serverIndex, "rooms"])
                    .findIndex((v) => v.get("_id") === payload.roomId);
                mutable.updateIn(
                    ["list", serverIndex, "rooms", roomIndex, "messages"],
                    (v) => v.push(fromJS(payload.data))
                );

                return mutable;
            });
        case socketActions.NEW_ROOM_CREATED.type:
            return state.updateIn(
                [
                    "list",
                    state
                        .get("list")
                        .findIndex((v) => v.get("_id") === payload.serverId),
                    "rooms",
                ],
                (v) => v.push(fromJS(payload.data))
            );
        default:
            return state;
    }
};

export default server;
