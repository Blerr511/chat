import Room from 'db/models/room';
import { IoError } from 'errors/IoError';

/**
 * Handle on message event
 * @param {function} next
 * @param {SocketIO.Socket} socket
 * @param {SocketIO.Server} io
 * @param {String|Buffer} data - incoming data
 * @return {void}
 */
const messageEvent = async (next, socket, io, data) => {
    try {
        if (typeof data !== 'object' || !data.room) {
            return next(new IoError('socket on message data.room is required'));
        }
        if (!socket.user) {
            return next(new IoError('socket user not found'));
        }
        const room = await Room.findById(data.room);
        if (!room)
            return next(new IoError(`room with id ${data.room} not found`));
        const message = await room.message(socket.user?._id, data.message);
        io.to(data.room).emit('message', {
            room: data.room,
            data: Object.assign(message, { sender: message.sender._id }),
        });
        next();
    } catch (error) {
        next(error);
    }
};

export default messageEvent;
