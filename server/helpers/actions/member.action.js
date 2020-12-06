const { NEW_MEMBER } = require('./constants');

module.exports.newMember = (payload) => ({ type: NEW_MEMBER, payload });
