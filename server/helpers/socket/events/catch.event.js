const SocketError = require('../../../errors/socket/Socket.error');

/**
 *
 * @param {SocketError} err
 * @param {import('socket.io').Socket} socket
 */
module.exports = (err, socket) => {
    if (err instanceof SocketError && err.isCritical)
        socket.disconnect(err.message);
};
