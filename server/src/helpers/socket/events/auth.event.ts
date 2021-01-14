import { d_SOCKET_AUTHENTICATED } from 'constants/socketEvents.constant';
import Server from 'db/models/server';
import User from 'db/models/user';
import { IoError } from 'errors/IoError';
import { verify } from 'jsonwebtoken';

if (process.env.NODE_ENV === 'development') require('colors');

export const authEvent = (next, socket, io, data) => {
    if (!data?.token)
        return next(new IoError('socket auth data.token is required'));
    verify(data.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new IoError(err));
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
        Server.find({ 'members.user': socket.user?._id })
            .populate('members.user members.role rooms rtcRooms')
            .lean()
            .then((data) => {
                data.forEach((el) => {
                    socket.join(el._id);
                });
            })
            .catch(console.error);
        next();
    });
};
