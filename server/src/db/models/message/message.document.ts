import { Document, Model } from 'mongoose';
import { IUser } from '../user/user.document';

export interface IMessage extends Document {
    data: string;
    sender: IUser['_id'];
    createdAt?: string;
}

export interface IMessageModel extends Model<IMessage> {}
