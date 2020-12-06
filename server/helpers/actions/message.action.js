const { SERVER_MESSAGE_RECEIVED } = require('./constants');

module.exports.sendMessage = (payload) => ({
    type: SERVER_MESSAGE_RECEIVED,
    payload,
});
