const socketError = require("../../messages/error/socket.error");
const { Room } = require("../../mongodb/schemas/room.schema");

/**
 * Handle on message event
 * @param {SocketIO.Socket} socket
 * @param {SocketIO.Server} io
 * @param {String|Buffer} data - incoming data
 * @return {void}
 */
module.exports = async (socket, io, data) => {
    if (typeof data !== "object" || !data.room) {
        return socket.disconnect(socketError.invalid_message);
    }
    if (!socket.user) {
        return socket.disconnect(socketError.user_not_signed);
    }
    const room = await Room.findById(data.room);
    if (!room) return socket.disconnect(socketError.invalid_message);
    const message = await room.message(socket.user?._id, data.message);
    io.to(data.room).emit("message", {
        room: data.room,
        data: Object.assign(message, { sender: message.sender._id }),
    });
};
