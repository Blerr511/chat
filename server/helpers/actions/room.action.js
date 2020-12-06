const { NEW_ROOM_CREATED, MEMBER_JOINED_ROOM } = require('./constants');

module.exports.newRoomCreated = (payload) => ({
    type: NEW_ROOM_CREATED,
    payload,
});

module.exports.memberJoined = (payload) => ({
    type: MEMBER_JOINED_ROOM,
    payload,
});
