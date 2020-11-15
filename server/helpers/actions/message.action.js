const SERVER_MESSAGE_RECEIVED = "SERVER_MESSAGE_RECEIVED";
const SEND_MESSAGE = "SEND_MESSAGE";

module.exports.socketActions = {
  SERVER_MESSAGE_RECEIVED,
  SEND_MESSAGE,
};

module.exports.sendMessage = (payload) => ({
  type: SERVER_MESSAGE_RECEIVED,
  payload,
});
