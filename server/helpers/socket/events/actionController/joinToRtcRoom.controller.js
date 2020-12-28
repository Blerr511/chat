const { RTCRoom } = require('../../../../db/schemas/RTCRoom.schema');
const MessageFiledError = require('../../../../errors/db/MessageFiled.error');
const NotFoundError = require('../../../../errors/db/NotFound.error');
const { joinRTCRoomSuccess } = require('../../../actions/room.action');

const joinToRoom = async (next, socket, io, data) => {
    console.log('trying to join room');
    try {
        const { roomId } = data;
        const rtcRoom = await RTCRoom.findById(roomId);
        if (!rtcRoom)
            throw new NotFoundError(`RTCRoom with id ${roomId} not found`);

        rtcRoom.members.push(socket.user._id);
        await rtcRoom.save();
        const res = await RTCRoom.populate(rtcRoom, 'users');
        socket._data = { serverId: rtcRoom.server, data: res };
        next();
    } catch (error) {
        next(new MessageFiledError(error));
    }
};

const emitSuccess = async (next, socket, io, payload, resolve) => {
    const data = socket._data;
    delete socket._data;
    io.to(data.serverId).emit('action', joinRTCRoomSuccess(data));
    next();
    resolve();
};

module.exports = {
    joinToRoom,
    emitSuccess,
};
