const { Room } = require('../mongodb/schemas/room.schema');
const { io } = require('../helpers/createServer.helper');
const { d_SOCKET_NEW_ROOM } = require('../constants/socketEvents.constant');

/**
 * @type {import('express').RequestHandler}
 * @description members - optional query param
 */
const getRooms = async (req, res, next) => {
    try {
        const { members } = req.query;
        const { user } = req;
        let room = null;
        if (members) {
            room = await Room.getRoom(members.split(','), user);
            room.members.map((user) => {
                if (user.socketId) {
                    io.sockets.connected[user.socketId].join(room._id);
                    io.sockets.connected[user.socketId].emit(d_SOCKET_NEW_ROOM);
                }
            });
        } else room = await Room.getRoomsOfUser(user);

        req.response = {
            code: 200,
            status: 'success',
            message: 'Success',
            data: room,
        };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { getRooms };
