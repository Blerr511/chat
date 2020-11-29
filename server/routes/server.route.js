const router = require('express').Router();

const s3 = require('../helpers/aws/S3');
const { io } = require('../helpers/createServer.helper');
const { Room } = require('../mongodb/schemas/room.schema');
const { Token } = require('../mongodb/schemas/token.schema');
const { Server } = require('../mongodb/schemas/server.schema');
const { Member } = require('../mongodb/schemas/member.schema');
const { getSocketByUserId } = require('../helpers/socket.helper');
const { newRoomCreated } = require('../helpers/actions/newRoom.action');
const { newMemberAction } = require('../helpers/actions/newMember.action');
const permissionMiddleware = require('../middleware/permission.middleware');
const { d_SOCKET_NEW_MEMBER } = require('../constants/socketEvents.constant');

/**
 * Handle get server request
 * @type {import("express").RequestHandler}
 */
const handleGetServers = async (req, res, next) => {
    try {
        const { user } = req;
        const servers = await Server.getMyServers(user);
        servers.map((server) => {
            getSocketByUserId(user._id)?.join(server._id);
        });
        req.response = {
            code: 200,
            status: 'success',
            message: 'Ok',
            data: servers,
        };
        next();
    } catch (error) {
        next(error);
    }
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
        const admin = new Member({ user: user._id });
        await admin.setRole('admin');
        const room = new Room({
            name: 'Main room',
        });
        const server = new Server({
            name,
            icon,
            members: [admin],
            rooms: [room],
        });
        await server.save();
        getSocketByUserId(user._id)?.join(server._id);
        const data = await Server.populate(server, {
            path: 'members.user members.role',
        });
        req.response = {
            code: 200,
            status: 'success',
            message: 'Server success created',
            data,
        };
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * @type {import('express').RequestHandler}
 */
const handleJoinServer = async (req, res, next) => {
    try {
        const {
            params: { serverId },
            user: { _id: userId },
            body: { token: key },
        } = req;
        const _token = await Token.findOne({ key });
        if (!_token) throw new Error('Invite is not valid');
        if (_token.useCount < 2) {
            await _token.remove();
        } else if (_token.useCount < Infinity) {
            _token.useCount--;
            await _token.save();
        }
        const server = await Server.findById(serverId);
        if (!server) throw new Error('server not found');
        for (let i = 0; i < server.members.length; i++) {
            // TODO - make member unique from mongoose schema
            const m = server.members[i];
            if (m.user.toString() === userId)
                throw new Error('User already joined to this server');
        }
        const member = new Member({ user: userId });
        server.members.push(member);
        await server.save();
        getSocketByUserId(userId)?.join(serverId);
        const payload = await Member.populate(member, { path: 'user role' });
        io.to(serverId).emit('action', newMemberAction(payload));
        req.response = {
            code: 200,
            status: 'success',
            message: 'Success joined to server',
        };
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Handle create new room for in server
 * @type {import("express").RequestHandler}
 */
const handleAddNewRoomToServer = async (req, res, next) => {
    try {
        const {
            body: { name },
            params: { serverId },
        } = req;
        const server = await Server.findById(serverId);

        if (!server) throw new Error('Server not found');
        if (!name) throw new Error('Room name is required');
        const room = new Room({
            name,
            members: [],
            messages: [],
        });

        server.rooms.push(room);
        await server.save();
        // const data = await Server.populate(server, {
        //     path: "members.user members.role",
        // });
        io.to(server._id).emit(
            'action',
            newRoomCreated({ serverId, data: room })
        );
        req.response = {
            code: 200,
            status: 'success',
            message: 'Room success created',
        };
        next();
    } catch (error) {
        next(error);
    }
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
            status: 'success',
            message: 'Success joined',
            data: room,
        };
        next();
    } catch (error) {
        next(error);
    }
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
            status: 'success',
            message: 'Success joined',
        };
        next();
    } catch (error) {
        next(error);
    }
};

router.get('/', handleGetServers);
router.post('/', s3.upload.single('serverIcon'), handleCreateServer);

router.post('/:serverId/join', handleJoinServer);

router.post(
    '/:serverId/newRoom',
    permissionMiddleware('createRoom', (req) => req.params.serverId),
    handleAddNewRoomToServer
);
router.post('/:serverId/:roomId/join', handleJoinToRoom);
router.post('/:serverId/:roomId/leave', handleLeaveRoom);
// ------------------------------- //

module.exports = router;
