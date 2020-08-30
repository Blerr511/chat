const User = require("../../mongodb/schemas/user.schema");

module.exports = (socket) => {
    User.findOne(socket.user?._id, (err, user) => {
        if (err) return false;
        user.online = false;
        user.save();
    });

    console.info(`SOCKET ${socket.id} ` + "DISCONNECTED".red);
};
