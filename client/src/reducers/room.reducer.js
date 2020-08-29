import { Map } from "immutable";
import {
    GET_MY_ROOMS_REQUEST,
    GET_MY_ROOMS_SUCCESS,
    GET_MY_ROOMS_FAILURE,
} from "../actions/room.action";
const initialState = Map({
    message: null,
    error: null,
    loading: false,
    rooms: [],
});
const rooms = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MY_ROOMS_REQUEST:
            return state.set("loading", true);
        case GET_MY_ROOMS_SUCCESS:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("rooms", payload);
                return mutable;
            });
        case GET_MY_ROOMS_FAILURE:
            return state.withMutations((mutable) => {
                mutable.set("loading", false);
                mutable.set("error", payload);
                return mutable;
            });
        default:
            return state;
    }
};

export default rooms;
