import { model } from 'mongoose';
import { IMessage, IMessageModel } from './message.document';
import MessageSchema from './message.schema';

const Message = model<IMessage, IMessageModel>('message', MessageSchema);

export default Message;
