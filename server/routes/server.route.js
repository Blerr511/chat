const { Server } = require("../mongodb/schemas/server.schema");
const catchHelper = require("../helpers/catch.helper");
const { Room } = require("../mongodb/schemas/room.schema");
const { getSocketByUserId } = require("../helpers/socket.helper");
const { io } = require("../helpers/createServer.helper");
const { d_SOCKET_NEW_MEMBER } = require("../constants/socketEvents.constant");
const multerHelper = require("../helpers/multer.helper");

const router = require("express").Router();
/**
 * Handle get server request
 * @type {import("express").RequestHandler}
 */
const handleGetServers = async (req, res, next) => {
    try {
        const { user } = req;
        const servers = await Server.getMyServers(user);

        req.response = {
            code: 200,
            status: "success",
            message: "Ok",
            data: servers,
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};
/**
 * Handle create new server request
 * @type {import("express").RequestHandler}
 */
const handleCreateServer = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { user } = req;
        const icon = req.file?.location;
        const server = new Server({
            name,
            icon,
            admins: [user._id],
            members: [],
            rooms: [],
        });
        await server.save();
        
        req.response = {
            code: 200,
            status: "success",
            message: "Server success created",
            data: server,
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};

/**
 * Handle create new room for in server
 * @type {import("express").RequestHandler}
 */
const handleAddNewRoomToServer = async (req, res, next) => {
    try {
        const { serverId } = req.params;
        const { name } = req.body;
        const server = await Server.findById(serverId);

        if (!server) throw new Error("Server not found");
        if (!name) throw new Error("Room name is required");
        const room = new Room({
            name,
            admins: [],
            members: [],
            messages: [],
        });

        const _server = await server.addRoom(room);

        req.response = {
            code: 200,
            status: "success",
            message: "Room success created",
            data: _server,
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};
/**
 * @type {import('express').RequestHandler}
 */
const handleJoinToRoom = async (req, res, next) => {
    try {
        const { serverId, roomId } = req.params;
        const {
            user: { _id: userId },
        } = req;
        await Server.disconnectEverything(userId);
        const room = await Server.joinRoom({ _id: serverId }, roomId, userId);
        io.to(roomId).emit(d_SOCKET_NEW_MEMBER);
        getSocketByUserId(userId)?.join(roomId);
        req.response = {
            code: 200,
            status: "success",
            message: "Success joined",
            data: room,
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};

/**
 * @type {import('express').RequestHandler}
 */
const handleLeaveRoom = async (req, res, next) => {
    try {
        const { serverId, roomId } = req.params;
        const {
            user: { _id: userId },
        } = req;
        await Server.disconnectEverything(userId);
        await Server.leaveRoom({ _id: serverId }, roomId, userId);
        getSocketByUserId(userId)?.leave(roomId);
        req.response = {
            code: 200,
            status: "success",
            message: "Success joined",
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};

router.get("/", handleGetServers);
router.post("/", multerHelper.upload.single("serverIcon"), handleCreateServer);

router.post("/:serverId/newRoom", handleAddNewRoomToServer);
router.post("/:serverId/:roomId/join", handleJoinToRoom);
router.post("/:serverId/:roomId/leave", handleLeaveRoom);
// ------------------------------- //

module.exports = router;
