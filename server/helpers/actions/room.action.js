const {
    NEW_ROOM_CREATED,
    MEMBER_JOINED_ROOM,
    NEW_RTC_ROOM_CREATED,
    JOIN_TO_RTC_CHANNEL_SUCCESS,
    JOIN_TO_RTC_CHANNEL_FAILURE,
} = require('./constants');

module.exports.newRoomCreated = (payload) => ({
    type: NEW_ROOM_CREATED,
    payload,
});

module.exports.newRtcRoomCreated = (payload) => ({
    type: NEW_RTC_ROOM_CREATED,
    payload,
});

module.exports.memberJoined = (payload) => ({
    type: MEMBER_JOINED_ROOM,
    payload,
});

module.exports.joinRTCRoomSuccess = (payload) => ({
    type: JOIN_TO_RTC_CHANNEL_SUCCESS,
    payload,
});

module.exports.joinRTCRoomFailure = (payload) => ({
    type: JOIN_TO_RTC_CHANNEL_FAILURE,
    payload,
});
