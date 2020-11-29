const MessageFiledError = require('../../../errors/db/MessageFiled.error');
const NotFoundError = require('../../../errors/db/NotFound.error');
const AuthFailedError = require('../../../errors/socket/AuthFailed.error');
const InvalidDataError = require('../../../errors/socket/InvalidData.error');
const { socketActions } = require('../../actions/message.action');

module.exports = (next, socket, io, { type, payload }) => {
    if (!type) return next(new InvalidDataError('Action type is required'));
    switch (type) {
        case socketActions.SEND_MESSAGE:
            socketOnMessage(next, socket, io, payload);
            break;
        default:
            break;
    }
};

const socketOnMessage = async (next, socket, io, data) => {
    try {
        if (typeof data !== 'object' || !data.roomId) {
            return next(
                new InvalidDataError(
                    `socket action ${socketActions.SEND_MESSAGE} serverId and roomId is required`
                )
            );
        }
        if (!socket.user) {
            return new AuthFailedError(`socket user not found`);
        }
        const { serverId, roomId, data: message } = data;
        const server = await Server.findById(serverId);
        if (!server)
            return next(
                new NotFoundError(`server with id ${serverId} not found`)
            );
        const _message = server.message(roomId, {
            data: message,
            sender: socket.user._id,
        });
        if (_message) {
            io.to(serverId).emit(
                'action',
                sendMessage({ serverId, roomId, data: _message })
            );
        }

        await server.save();

        next();
    } catch (error) {
        next(new MessageFiledError(error));
    }
};
