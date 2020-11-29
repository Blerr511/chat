const SocketError = require('./Socket.error');

module.exports = class AuthFailedError extends (
    SocketError
) {
    isCritical = true;
};
