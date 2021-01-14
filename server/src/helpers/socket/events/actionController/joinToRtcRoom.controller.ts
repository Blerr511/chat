import RTCRoom from 'db/models/rtcRoom';
import { IoError } from 'errors/IoError';
import { joinRTCRoomSuccess } from 'helpers/actions/room.action';

const joinToRoom = async (next, socket, io, data) => {
    console.log('trying to join room');
    try {
        const { roomId } = data;
        const rtcRoom = await RTCRoom.findById(roomId);
        if (!rtcRoom)
            throw new IoError<{ roomId: string }>(
                `RTCRoom with id ${roomId} not found`,
                { roomId: { type: 'error', message: 'Room not found' } }
            );

        rtcRoom.members.push(socket.user._id);
        await rtcRoom.save();
        const res = await RTCRoom.populate(rtcRoom, { path: 'users' });
        socket._data = { serverId: rtcRoom.server, data: res };
        next();
    } catch (error) {
        next(error);
    }
};

const emitSuccess = async (next, socket, io, payload, resolve) => {
    const data = socket._data;
    delete socket._data;
    io.to(data.serverId).emit('action', joinRTCRoomSuccess(data));
    next();
    resolve();
};

const joinToRtcRoomController = [joinToRoom, emitSuccess];

export default joinToRtcRoomController;
