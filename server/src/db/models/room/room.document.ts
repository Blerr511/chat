import { Document, Model } from 'mongoose';
import { IMessage } from '../message/message.document';
import { IServer } from '../server/server.document';
import { IUser } from '../user/user.document';

export interface IRoom extends Document {
    name: string;
    messages: IMessage['_id'];
    server: IServer['_id'];
    createdAt: string;
    message: (userId: IUser['_id'], data: string) => IMessage;
}

export interface IRoomModel extends Model<IRoom> {}
