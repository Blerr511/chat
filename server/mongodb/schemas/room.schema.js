const { Schema, model, SchemaTypes } = require("mongoose");
const { MessageSchema } = require("./message.schema");
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
// /**
//  * @param {Array.<String>} members
//  */
// RoomSchema.statics.getRoom = async function (members) {
//     const users = await User.findManyByUsernames(members);
//     return Room.findOne({
//         members: users,
//     });
// };
/**
 * @param {User} creator
 * @param {Array.<String>} members
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

RoomSchema.methods.message = async function (user, data) {
    const sender = await User.findOne(user);
    const message = new Message({ sender, data });
    this.messages.push(message);
    await message.save();
    return this.save();
};

const Room = model("room", RoomSchema);
module.exports = Room;
