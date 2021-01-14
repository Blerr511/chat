import { Schema } from 'mongoose';
import { IMessage } from './message.document';

const MessageSchema = new Schema<IMessage>(
    {
        data: { type: String, required: true },
        sender: { type: Schema.Types.ObjectId, ref: 'user' },
    },
    {
        timestamps: {
            createdAt: true,
            currentTime: () => Date.now(),
            updatedAt: true,
        },
    }
);

export default MessageSchema;
