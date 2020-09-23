const { Schema, model } = require("mongoose");
const { MessageSchema, MessageModel } = require("./message.schema");
const User = require("./user.schema");
const { MemberSchema, Member } = require("./member.schema");
/**
 * @class RoomSchema
 */
const RoomSchema = new Schema(
    {
        name: {
            type: String,
            default: "Room",
        },
        messages: [{ type: MessageSchema }],
        members: [
            {
                type: MemberSchema,
                index: { unique: true, dropDups: true },
            },
        ],
    },
    {
        timestamps: false,
    }
);
RoomSchema.index({ members: 1 }, { unique: true, dropDups: true });
/**
 * Get or create room for members
 * @param {Array.<String>} members
 * @param {User} creator
 * @return {Promise<Room>}
 */
RoomSchema.statics.getRoom = async function (members, creator) {
    const users = await User.findManyByUsernames(members);
    if (users.length !== members.length) throw new Error("Users not found");
    const checkExistRoom = await this.findOne({
        "members.user": { $all: users.concat(creator._id) },
    })
        .populate("members.user members.role")
        .lean();
    if (checkExistRoom) return checkExistRoom;
    const _members = users.map((user) => new Member({ user: user._id }));
    const _admin = new Member({ user: creator._id });
    await _admin.setRole("admin");
    const room = new this({
        messages: [],
        members: [..._members, _admin],
    });
    await room.save();
    return await Room.populate(room, { path: "members.user members.role" });
};

RoomSchema.statics.getRoomsOfUser = async function (user) {
    if (!user) throw new Error("User not found");

    const rooms = await this.find({ "members.user": user })
        .populate("members.user members.role")
        .lean();
    if (!rooms) throw new Error("Rooms not found");
    return rooms;
};

RoomSchema.methods.message = async function (userId, data) {
    const message = new MessageModel({ sender: userId, data });
    this.messages.push(message);
    await message.save();
    this.save();
    return message.toObject();
};

const Room = model("room", RoomSchema);
module.exports = { Room, RoomSchema };
