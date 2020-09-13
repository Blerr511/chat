const { Schema, model } = require("mongoose");
const {
    userErrors,
    roomErrors,
} = require("../../messages/error/mongoose.error");
const { RoomSchema, Room } = require("./room.schema");

const ServerSchema = new Schema({
    name: { type: String, required: [true, "Server name is required"] },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
            unique: true,
        },
    ],
    admins: [{ type: Schema.Types.ObjectId, ref: "user" }],
    rooms: [{ type: RoomSchema }],
    icon: { type: String, default: "" },
});

ServerSchema.statics.getMyServers = async function (user) {
    if (!user) throw new Error(userErrors.user_not_found);
    const server = await this.find({
        $or: [{ members: user }, { admins: user }],
    })
        .populate("members admins rooms")
        .lean();
    if (!server) throw new Error(roomErrors.server_not_exists);
    return server;
};

ServerSchema.methods.addRoom = async function (room) {
    this.rooms.push(room);
    await this.save();
    return this;
};

ServerSchema.methods.addMember = async function (_server, roomId, userId) {
    const result = await this.updateOne(_server, {
        $addToSet: { members: userId },
    });
    if (!result.ok) throw new Error("Some error happens");
    return roomId;
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
