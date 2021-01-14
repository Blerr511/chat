import { ActionCreator } from 'interfaces/Action.interface';
import {
    JOIN_TO_RTC_CHANNEL_FAILURE,
    JOIN_TO_RTC_CHANNEL_SUCCESS,
    MEMBER_JOINED_ROOM,
    NEW_ROOM_CREATED,
    NEW_RTC_ROOM_CREATED,
} from './constants';

export const newRoomCreated: ActionCreator = (payload) => ({
    type: NEW_ROOM_CREATED,
    payload,
});
export const newRtcRoomCreated: ActionCreator = (payload) => ({
    type: NEW_RTC_ROOM_CREATED,
    payload,
});

export const memberJoined: ActionCreator = (payload) => ({
    type: MEMBER_JOINED_ROOM,
    payload,
});

export const joinRTCRoomSuccess: ActionCreator = (payload) => ({
    type: JOIN_TO_RTC_CHANNEL_SUCCESS,
    payload,
});

export const joinRTCRoomFailure: ActionCreator = (payload) => ({
    type: JOIN_TO_RTC_CHANNEL_FAILURE,
    payload,
});

const roomActionCreators = {
    newRoomCreated,
    newRtcRoomCreated,
    memberJoined,
    joinRTCRoomSuccess,
    joinRTCRoomFailure,
};

export default roomActionCreators;
