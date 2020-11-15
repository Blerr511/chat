const NEW_ROOM_CREATED = "NEW_ROOM_CREATED";

module.exports.newRoomCreated = (payload) => ({
  type: NEW_ROOM_CREATED,
  payload,
});
