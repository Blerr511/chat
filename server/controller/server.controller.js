const { Room } = require('../db/schemas/room.schema');
const { Token } = require('../db/schemas/token.schema');
const { Server } = require('../db/schemas/server.schema');
const { Member } = require('../db/schemas/member.schema');

const adapter = require('../services/socket.io/helper/socketAdapter');
const { IO } = require('../services/socket.io');

const NotFoundError = require('../errors/db/NotFound.error');
const DuplicateError = require('../errors/db/Duplicate.error');
const RequiredError = require('../errors/api/Required.error');

const actions = require('../helpers/actions');
/**
 * Handle get server request
 * @type {import("express").RequestHandler}
 */
const getMyServers = async (req, res, next) => {
    try {
        const { user } = req;
        const servers = await Server.getMyServers(user);

        const socket = adapter.getByUserId(user._id);
        socket &&
            servers.map((s) => {
                socket.join(s._id);
                s.rooms.map((room) => {
                    socket.join(room._id);
                });
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
const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { user } = req;
        const icon = req.file?.location;
        const admin = new Member({ user: user._id });
        await admin.setRole('admin');

        const server = new Server({
            name,
            icon,
            members: [admin],
            rooms: [],
        });
        const room = new Room({
            name: 'Main room',
            server: server._id,
        });
        server.rooms.push(room);
        await room.save();
        await server.save();

        adapter.getByUserId(user._id)?.join(server._id);

        const data = await Server.populate(server, {
            path: 'members.user members.role rooms',
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
const joinServer = async (req, res, next) => {
    try {
        const {
            params: { serverId },
            user: { _id: userId },
            body: { token: key },
        } = req;
        const _token = await Token.findOne({ key });
        if (!_token) throw new NotFoundError('Invite is not valid');
        if (_token.useCount < 2) {
            await _token.remove();
        } else if (_token.useCount < Infinity) {
            _token.useCount--;
            await _token.save();
        }
        const server = await Server.findById(serverId);
        if (!server) throw new NotFoundError('server not found');
        for (let i = 0; i < server.members.length; i++) {
            // TODO - make member unique from mongoose schema
            const m = server.members[i];
            if (m.user.toString() === userId)
                throw new DuplicateError('User already joined to this server');
        }
        const member = new Member({ user: userId });
        server.members.push(member);
        await server.save();
        adapter.getByUserId(userId)?.join(serverId);

        const payload = await Member.populate(member, { path: 'user role' });
        req.getIo()
            .to(serverId)
            .emit('action', actions.member.newMember(payload));
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
const addRoom = async (req, res, next) => {
    try {
        const {
            body: { name },
            params: { serverId },
        } = req;
        const server = await Server.findById(serverId);

        if (!server) throw new NotFoundError('Server not found');
        if (!name) throw new RequiredError('Room name is required');
        const room = new Room({
            name,
            server: server._id,
        });
        await room.save();
        server.rooms.push(room);
        await server.save();
        // const data = await Server.populate(server, {
        //     path: "members.user members.role",
        // });

        IO.to(server._id).emit(
            'action',
            actions.room.newRoomCreated({ serverId, data: room })
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
const joinRoom = async (req, res, next) => {
    try {
        const { serverId, roomId } = req.params;
        const {
            user: { _id: userId },
        } = req;
        await Server.disconnectEverything(userId);
        const room = await Server.joinRoom({ _id: serverId }, roomId, userId);
        IO.to(roomId).emit('action', actions.room.memberJoined());
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
const leaveRoom = async (req, res, next) => {
    try {
        const { serverId, roomId } = req.params;
        const {
            user: { _id: userId },
        } = req;
        await Server.disconnectEverything(userId);
        await Server.leaveRoom({ _id: serverId }, roomId, userId);
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

module.exports = {
    getMyServers,
    create,
    joinServer,
    addRoom,
    joinRoom,
    leaveRoom,
};
