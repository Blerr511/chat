const config = require("../../config");
const { verify } = require("jsonwebtoken");
const disconnectHandler = require("./disconnect.handler");
const messageHandler = require("./message.handler");
const {
    d_SOCKET_AUTH,
    d_SOCKET_UNAUTHORIZED,
    d_SOCKET_AUTHENTICATED,
    d_SOCKET_MESSAGE,
} = require("../../constants/socketEvents.constant");
const User = require("../../mongodb/schemas/user.schema");
const Room = require("../../mongodb/schemas/room.schema");
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
                    socket.connectedAt = new Date();
                    socket.emit(d_SOCKET_AUTHENTICATED);
                    console.info(
                        `SOCKET ${socket.id} ` + "AUTHENTICATED".green
                    );
                    User.findOne(socket.user, (err, doc) => {
                        if (err) return false;
                        doc.online = true;
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

        socket.on(d_SOCKET_AUTH, auth);
    });
};
