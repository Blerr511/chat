const token = require('./token.controller');
const auth = require('./auth.controller');
const _static = require('./static.controller');
const permission = require('./permission.controller');
const room = require('./room.controller');
const server = require('./server.controller');

module.exports = {
    token,
    auth,
    static: _static,
    permission,
    room,
    server,
};
