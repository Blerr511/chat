import { Schema } from 'mongoose';
import Message from '../message';

/**
 * @class RoomSchema
 */
const RoomSchema = new Schema(
    {
        name: {
            type: String,
            default: 'Room',
        },
        messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
        server: { type: Schema.Types.ObjectId, ref: 'server' },
    },
    {
        timestamps: false,
    }
);

RoomSchema.methods.message = async function (userId, data) {
    const message = new Message({ sender: userId, data });
    await message.save();
    this.messages.push(message);
    this.save();
    return message.toObject();
};

export default RoomSchema;
