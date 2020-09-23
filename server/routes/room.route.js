const router = require("express").Router();

const { Room } = require("../mongodb/schemas/room.schema");
const catchHelper = require("../helpers/catch.helper");
const { io } = require("../helpers/createServer.helper");
const { d_SOCKET_NEW_ROOM } = require("../constants/socketEvents.constant");

/**
 * Handle create or get new room request
 * @param {ExpressRequest} req - request
 * @param {ExpressResponse} res - response
 * @param {ExpressNextFunction} next - next callback
 * @return {Promise<void>}
 */
const handleGetRooms = async (req, res, next) => {
    try {
        const { members } = req.query;
        const { user } = req;
        let room = null;
        if (members) {
            room = await Room.getRoom(members.split(","), user);
            room.members.map((user) => {
                if (user.socketId) {
                    io.sockets.connected[user.socketId].join(room._id);
                    io.sockets.connected[user.socketId].emit(d_SOCKET_NEW_ROOM);
                }
            });
        } else room = await Room.getRoomsOfUser(user);

        req.response = {
            code: 200,
            status: "success",
            message: "Success",
            data: room,
        };
    } catch (error) {
        catchHelper(req, error);
    }

    next();
};

router.get("/", handleGetRooms);

module.exports = router;
