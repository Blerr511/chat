const { Schema, model, SchemaTypes } = require('mongoose');
const { MessageSchema, MessageModel } = require('./message.schema');
/**
 * @class RoomSchema
 */
const RoomSchema = new Schema(
    {
        name: {
            type: String,
            default: 'Room',
        },
        messages: [{ type: MessageSchema }],
        server: { type: SchemaTypes.ObjectId, ref: 'server' },
    },
    {
        timestamps: false,
    }
);

RoomSchema.methods.message = async function (userId, data) {
    const message = new MessageModel({ sender: userId, data });
    this.messages.push(message);
    await message.save();
    this.save();
    return message.toObject();
};

const Room = model('room', RoomSchema);
module.exports = { Room, RoomSchema };
