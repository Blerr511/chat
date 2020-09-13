const User = require("../../mongodb/schemas/user.schema");
const { deleteSocketUser } = require("../socket.helper");

module.exports = (socket) => {
    User.findOne(socket.user?._id, (err, user) => {
        if (err) return false;
        user.online = false;
        user.socketId = null;
        user.save();
    });
    deleteSocketUser(socket.user?._id);
    if (process.env.NODE_ENV === "development")
        console.info(`SOCKET ${socket.id} ` + "DISCONNECTED".red);
};
