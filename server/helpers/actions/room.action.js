const {
    NEW_ROOM_CREATED,
    MEMBER_JOINED_ROOM,
    NEW_RTC_ROOM_CREATED,
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
