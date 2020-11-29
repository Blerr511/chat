const auth = require('./auth.event');
const connect = require('./connect.event');
const action = require('./action.event');

const _catch = require('./catch.event');

module.exports = { auth, connect, action, catch: _catch };
