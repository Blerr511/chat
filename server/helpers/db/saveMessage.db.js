const { Room } = require("../../mongodb/schemas/room.schema");
const {
    roomErrors,
    userErrors,
} = require("../../messages/error/mongoose.error");
const { MessageModel } = require("../../mongodb/schemas/message.schema");
const User = require("../../mongodb/schemas/user.schema");

/**
 * @param {String} room_id - id of room messaging
 * @param {String} sender_id - id of sender user
 * @param {String} data - message
 */
module.exports = async (room_id, sender_id, data) => {
    const room = await Room.findById(room_id);
    const sender = await User.findById(sender_id);
    if (!room) throw roomErrors.room_not_exists;
    if (!sender) throw userErrors.user_not_found;
    const message = new MessageModel({ sender, data });
    room.messages.push(message);
    return await room.save();
};
