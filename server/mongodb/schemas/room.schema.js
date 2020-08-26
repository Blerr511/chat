const { Schema, model, SchemaTypes } = require("mongoose");

const RoomSchema = new Schema(
    {
        messages: [{ type: SchemaTypes.ObjectId, ref: "user" }],
        members: [{ type: SchemaTypes.ObjectId, ref: "message" }],
        admins: [{ type: SchemaTypes.ObjectId, ref: "user" }],
    },
    {
        timestamps: { createdAt: true },
    }
);

const Room = model("room", RoomSchema);
module.exports = Room;
