const { Schema, model, SchemaTypes } = require("mongoose");
const { MessageSchema, MessageModel } = require("./message.schema");
const User = require("./user.schema");
const { roomErrors } = require("../../messages/error/mongoose.error");

const RoomSchema = new Schema(
    {
        messages: [{ type: MessageSchema }],
        members: [{ type: SchemaTypes.ObjectId, ref: "user" }],
        admins: [{ type: SchemaTypes.ObjectId, ref: "user" }],
    },
    {
        timestamps: { createdAt: true },
    }
);

/**
 * Get or create room for members
 * @param {Array.<String>} members
 * @param {User} creator
 * @return {Promise<Room>}
 */
RoomSchema.statics.getRoom = async function (members, creator) {
    const users = await User.findManyByUsernames(members);
    const checkExistRoom = await this.findOne({
        members: { $in: users },
    })
        .populate("members admins")
        .lean();
    if (checkExistRoom) return checkExistRoom;
    const admin = await User.findOne(creator);
    const room = new this({
        messages: [],
        admins: [admin],
        members: [...users, admin],
    });
    await room.save();
    return room;
};

RoomSchema.statics.getRoomsOfUser = async function (user) {
    const dbUser = await User.findOne(user);
    if (!dbUser) throw new Error("User not found");

    const rooms = await this.find({ members: { $in: dbUser } });
    if (!rooms) throw new Error("Rooms not found");
    return rooms;
};

RoomSchema.methods.message = async function (user, data) {
    const sender = await User.findOne(user);
    const message = new MessageModel({ sender, data });
    this.messages.push(message);
    await message.save();
    return this.save();
};

const Room = model("room", RoomSchema);
module.exports = Room;
