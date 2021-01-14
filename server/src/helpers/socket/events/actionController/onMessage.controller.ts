import Room from 'db/models/room';
import { IoError } from 'errors/IoError';
import { sendMessage } from 'helpers/actions/message.action';

const createMessage = async (next, socket, io, data) => {
    try {
        const { roomId, data: _message } = data;
        const room = await Room.findById(roomId);
        if (!room) throw `Room with id ${roomId} not found`;
        const message = await room.messages(socket.user._id, _message);
        socket._data = { data: message, roomId, serverId: room.server };
        next();
    } catch (error) {
        next(new IoError(error));
    }
};

const emitRoom = async (next, socket, io, payload, resolve) => {
    const data = socket._data;
    delete socket._data;
    io.to(data.roomId).emit('action', sendMessage(data));
    next();
    resolve();
};

const onMessage = [createMessage, emitRoom];

export default onMessage;
