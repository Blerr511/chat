const MessageFiledError = require('../../../../errors/db/MessageFiled.error');
const NotFoundError = require('../../../../errors/db/NotFound.error');
const { sendMessage } = require('../../../actions/message.action');
const { Room } = require('../../../../db/schemas/room.schema');
const createMessage = async (next, socket, io, data) => {
    try {
        const { roomId, data: _message } = data;
        const room = await Room.findById(roomId);
        if (!room) throw new NotFoundError(`Room with id ${roomId} not found`);
        const message = await room.message(socket.user._id, _message);
        socket._data = { data: message, roomId, serverId: room.server };
        next();
    } catch (error) {
        next(new MessageFiledError(error));
    }
};

const emitRoom = async (next, socket, io, payload, resolve) => {
    const data = socket._data;
    delete socket._data;
    io.to(data.roomId).emit('action', sendMessage(data));
    next();
    resolve();
};

module.exports = { createMessage, emitRoom };
