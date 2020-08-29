const Room = require("../mongodb/schemas/room.schema");
const catchHelper = require("../helpers/catch.helper");

/**
 * Handle create or get new room request
 * @param {ExpressRequest} req - request
 * @param {ExpressResponse} res - response
 * @param {ExpressNextFunction} next - next callback
 * @return {Promise<void>}
 */
module.exports = async (req, res, next) => {
    try {
        const { members } = req.query;
        const { user } = req;
        const room = await Room.getRoom(members, user);
        req.response = {
            code: 200,
            status: true,
            message: "get room",
            data: room,
        };
    } catch (error) {
        catchHelper(error);
    }

    next();
};
