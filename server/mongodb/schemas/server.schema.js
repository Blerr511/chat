const { Schema, model } = require("mongoose");
const {
    userErrors,
    roomErrors,
} = require("../../messages/error/mongoose.error");
const { MemberSchema } = require("./member.schema");
const { MessageModel } = require("./message.schema");
const { RoomSchema } = require("./room.schema");

const ServerSchema = new Schema({
    name: { type: String, required: [true, "Server name is required"] },
    members: [
        {
            type: MemberSchema,
            index: { unique: true, dropDups: true },
        },
    ],
    rooms: [{ type: RoomSchema }],
    icon: { type: String, default: null },
});

ServerSchema.methods.addMember = async function (_server, roomId, userId) {
    const result = await this.updateOne(_server, {
        $addToSet: { members: userId },
    });
    if (!result.ok) throw new Error("Some error happens");
    return roomId;
};

ServerSchema.methods.message = function (roomId, data) {
    let message = null;
    for (let i = 0; i < this.rooms.length; i++) {
        const room = this.rooms[i];
        if (room._id.toString() === roomId) {
            message = new MessageModel(data);
            room.messages.push(new MessageModel(data));
        }
    }
    return message;
};

ServerSchema.statics.getMyServers = async function (user) {
    if (!user) throw new Error(userErrors.user_not_found);
    const server = await this.find({ "members.user": user })
        .populate("members.user members.role rooms")
        .lean();
    if (!server) throw new Error(roomErrors.server_not_exists);
    return server;
};

ServerSchema.statics.joinRoom = async function (_server, roomId, userId) {
    const result = await this.findOneAndUpdate(
        { ..._server, "rooms._id": roomId },
        { $addToSet: { "rooms.$.members": userId } },
        { new: true }
    );
    if (!result) throw new Error("Some error happens");
    return result;
};

ServerSchema.statics.leaveRoom = async function (_server, roomId, userId) {
    const result = await this.updateOne(
        { ..._server, "rooms._id": roomId },
        { $pull: { "rooms.$.members": userId } }
    );

    if (!result.ok) throw new Error("Some error happens");
    return roomId;
};

ServerSchema.statics.disconnectEverything = async function (userId) {
    const result = await this.updateMany(
        { "rooms.members": userId },
        { $pull: { "rooms.$.members": userId } }
    );
    if (!result.ok) throw new Error("Some error happens");
    return result;
};

const Server = model("server", ServerSchema);
module.exports = {
    Server,
};
