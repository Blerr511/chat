const router = require("express").Router();

const Room = require("../mongodb/schemas/room.schema");
const catchHelper = require("../helpers/catch.helper");

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
        const room = members
            ? await Room.getRoom(members.split(","), user)
            : await Room.getRoomsOfUser(user);
        req.response = {
            code: 200,
            status: true,
            message: "get room",
            data: room,
        };
    } catch (error) {
        catchHelper(req, error);
    }

    next();
};

router.get("/", handleGetRooms);

module.exports = router;
