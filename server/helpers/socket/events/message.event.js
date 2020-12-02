const MessageFiledError = require('../../../errors/db/MessageFiled.error');
const NotFoundError = require('../../../errors/db/NotFound.error');
const AuthFailedError = require('../../../errors/socket/AuthFailed.error');
const InvalidDataError = require('../../../errors/socket/InvalidData.error');
const { Room } = require('../../../mongodb/schemas/room.schema');

/**
 * Handle on message event
 * @param {function} next
 * @param {SocketIO.Socket} socket
 * @param {SocketIO.Server} io
 * @param {String|Buffer} data - incoming data
 * @return {void}
 */
module.exports = async (next, socket, io, data) => {
    try {
        if (typeof data !== 'object' || !data.room) {
            return next(
                new InvalidDataError('socket on message data.room is required')
            );
        }
        if (!socket.user) {
            return next(new AuthFailedError('socket user not found'));
        }
        const room = await Room.findById(data.room);
        if (!room)
            return next(
                new NotFoundError(`room with id ${data.room} not found`)
            );
        const message = await room.message(socket.user?._id, data.message);
        io.to(data.room).emit('message', {
            room: data.room,
            data: Object.assign(message, { sender: message.sender._id }),
        });
        next();
    } catch (error) {
        next(new MessageFiledError(error));
    }
};
