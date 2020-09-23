const { verify } = require("jsonwebtoken");
require("colors");
const config = require("../../config");
const disconnectHandler = require("./disconnect.handler");
const messageHandler = require("./message.handler");
const {
    d_SOCKET_AUTH,
    d_SOCKET_UNAUTHORIZED,
    d_SOCKET_AUTHENTICATED,
    d_SOCKET_MESSAGE,
} = require("../../constants/socketEvents.constant");
const User = require("../../mongodb/schemas/user.schema");
const { Room } = require("../../mongodb/schemas/room.schema");
const { addSocketUser } = require("../socket.helper");
const actionHandler = require("./action.handler");
/**
 * Initiating socket io
 * @param {SocketIO.Server} io
 */
module.exports = (io) => {
    io.on("connect", (socket) => {
        delete io.sockets.connected[socket.id];
        const verifyOptions = {
            timeout: 3000,
            token: config.jwtSecret,
        };

        const tmr = setTimeout(() => {
            socket.disconnect(d_SOCKET_UNAUTHORIZED);
        }, verifyOptions.timeout);

        const auth = (data) => {
            if (!data) return socket.disconnect(d_SOCKET_UNAUTHORIZED);
            clearTimeout(tmr);
            verify(data.token, verifyOptions.token, (err, decoded) => {
                if (err) {
                    return socket.disconnect(d_SOCKET_UNAUTHORIZED);
                }
                if (decoded) {
                    io.sockets.connected[socket.id] = socket;
                    delete decoded.iat;
                    delete decoded.exp;
                    socket.user = decoded;
                    addSocketUser(decoded._id, socket.id);
                    socket.connectedAt = new Date();
                    socket.emit(d_SOCKET_AUTHENTICATED);
                    if (process.env.NODE_ENV === "development")
                        console.info(
                            `SOCKET ${socket.id} ` + "AUTHENTICATED".green
                        );
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
                }
            });
        };

        socket.on("disconnect", () => disconnectHandler(socket));
        socket.on(d_SOCKET_MESSAGE, (data) => messageHandler(socket, io, data));
        socket.on("action", actionHandler(socket, io));
        socket.on(d_SOCKET_AUTH, auth);
    });
};
