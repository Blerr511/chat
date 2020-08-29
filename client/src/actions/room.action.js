import { roomServices } from "../services/room.service";

export const GET_MY_ROOMS_REQUEST = "GET_MY_ROOMS_REQUEST";
export const GET_MY_ROOMS_SUCCESS = "GET_MY_ROOMS_SUCCESS";
export const GET_MY_ROOMS_FAILURE = "GET_MY_ROOMS_FAILURE";


export const _getMyRooms = () => (dispatch) => {
    const request = () => {
        return { type: GET_MY_ROOMS_REQUEST };
    };
    const success = (payload) => {
        return { type: GET_MY_ROOMS_SUCCESS, payload };
    };
    const failure = (error) => {
        return { type: GET_MY_ROOMS_FAILURE, payload: error };
    };
    dispatch(request());
    roomServices.getMyRooms().then(
        (data) => dispatch(success(data)),
        (error) => dispatch(failure(error))
    );
};
