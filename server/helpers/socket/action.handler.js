const socketError = require("../../messages/error/socket.error");
const { Server } = require("../../mongodb/schemas/server.schema");
const { sendMessage, socketActions } = require("../actions/message.action");

/**
 * Handle on message event
 * @param {SocketIO.Socket} socket
 * @param {SocketIO.Server} io
 * @return {void}
 */
module.exports = (socket, io) => {
    const socketOnMessage = async (data) => {
        if (typeof data !== "object" || !data.serverId || !data.roomId) {
            return false;
        }
        if (!socket.user) {
            return false;
        }
        const { serverId, roomId, data: message } = data;
        const server = await Server.findById(serverId);
        if (!server) return socket.disconnect(socketError.invalid_message);
        const _message = server.message(roomId, {
            data: message,
            sender: socket.user._id,
        });
        if (_message) {
            io.to(serverId).emit(
                "action",
                sendMessage({ serverId, roomId, data: _message })
            );
        }

        await server.save();
    };

    return async ({ type, payload }) => {
        if (!type) return false;
        switch (type) {
            case socketActions.SEND_MESSAGE:
                socketOnMessage(payload);
                break;

            default:
                break;
        }
    };
};
