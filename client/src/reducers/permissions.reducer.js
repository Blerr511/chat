const { Map, fromJS } = require("immutable");
const {
    GET_ROLES_REQUEST,
    GET_ROLES_FAILURE,
    GET_ROLES_SUCCESS,
} = require("../actions/permissions.action");

const initialState = Map({
    loading: false,
    data: [],
});

const permissions = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ROLES_REQUEST:
            return state.set("loading", true);
        case GET_ROLES_FAILURE:
            return state.set("loading", false);
        case GET_ROLES_SUCCESS:
            return state.set("loading", false).set("data", fromJS(payload));
        default:
            return state;
    }
};

export default permissions;
