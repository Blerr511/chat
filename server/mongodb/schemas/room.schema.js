const { Schema, model } = require("mongoose");
const { MessageSchema, MessageModel } = require("./message.schema");
const User = require("./user.schema");

const RoomSchema = new Schema(
    {
        name: {
            type: String,
            default: function () {
                return this.members
                    .map((el) => el.firstName + el.lastName)
                    .join(" , ");
            },
        },
        messages: [{ type: MessageSchema }],
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                index: { unique: true, dropDups: true },
            },
        ],

        admins: [{ type: Schema.Types.ObjectId, ref: "user" }],
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
    const admin = await User.findOne(creator).select("+socketId");
    if (users.length !== members.length) throw new Error("Users not found");
    const checkExistRoom = await this.findOne({
        members: users.concat(admin),
    })
        .populate("members admins")
        .lean();
    if (checkExistRoom) return Object.assign(checkExistRoom, { isNew: false });
    const room = new this({
        messages: [],
        admins: [admin],
        members: [...users, admin],
    });
    await room.save();
    return Object.assign(room, { isNew: true });
};

RoomSchema.statics.getRoomsOfUser = async function (user) {
    // const dbUser = await User.findOne(user);
    if (!user) throw new Error("User not found");

    const rooms = await this.find({ members: user })
        .populate("members admins")
        .lean();
    if (!rooms) throw new Error("Rooms not found");
    return rooms;
};

RoomSchema.methods.message = async function (userId, data) {
    const sender = await User.findById(userId);
    const message = new MessageModel({ sender, data });
    this.messages.push(message);
    await message.save();
    this.save();
    return message.toObject();
};

const Room = model("room", RoomSchema);
module.exports = { Room, RoomSchema };
