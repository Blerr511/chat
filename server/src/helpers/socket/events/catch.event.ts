import { IoError } from 'errors/IoError';

/**
 *
 * @param {SocketError} err
 * @param {import('socket.io').Socket} socket
 */
export const catchEvent = (err, socket) => {
    if (err instanceof IoError && err.isCritical)
        socket.disconnect(err.message);
};
