const config = require("../../config");
const { verify } = require("jsonwebtoken");
const disconnectHandler = require("./disconnect.handler");
const messageHandler = require("./message.handler");

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
            socket.disconnect("unauthorized");
        }, verifyOptions.timeout);

        const auth = (data) => {
            clearTimeout(tmr);
            verify(data.token, verifyOptions.token, (err, decoded) => {
                if (err) {
                    return socket.disconnect("unauthorized");
                }
                if (decoded) {
                    io.sockets.connected[socket.id] = socket;
                    socket.user = decoded;
                    socket.connectedAt = new Date();
                    socket.emit("authenticated");
                    console.info(
                        `SOCKET ${socket.id} ` + "AUTHENTICATED".green
                    );
                }
            });
        };

        socket.on("disconnect", () => disconnectHandler(socket));

        socket.on("message", messageHandler);

        socket.on("auth", auth);
    });
};
