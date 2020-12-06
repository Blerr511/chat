const JWTDecodeError = require('../../../errors/auth/JWTDecode.error');
const AuthFailedError = require('../../../errors/socket/AuthFailed.error');
const {
    d_SOCKET_AUTHENTICATED,
} = require('../../../constants/socketEvents.constant');
const User = require('../../../db/schemas/user.schema');
const { Room } = require('../../../db/schemas/room.schema');
const { verify } = require('jsonwebtoken');

if (process.env.NODE_ENV === 'development') require('colors');

const authEvent = (next, socket, io, data) => {
    if (!data?.token)
        return next(new AuthFailedError('socket auth data.token is required'));
    verify(data.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new JWTDecodeError(err));
        if (decoded) {
            clearTimeout(socket.disconnectTimer);
            delete socket.disconnectTimer;
            delete decoded.iat;
            delete decoded.exp;
            socket.user = decoded;
        }
        socket.connectedAt = new Date();
        socket.emit(d_SOCKET_AUTHENTICATED);
        if (process.env.NODE_ENV === 'development')
            console.info(`SOCKET ${socket.id} ` + 'AUTHENTICATED'.green);
        User.findById(socket.user?._id, (err, doc) => {
            if (err) return false;
            doc.online = true;
            doc.socketId = socket.id;
            doc.save();
        });
        Room.getRoomsOfUser(socket.user)
            .then((data) => {
                data.forEach((el) => {
                    socket.join(el._id);
                });
            })
            .catch(console.error);
        next();
    });
};

module.exports = authEvent;
