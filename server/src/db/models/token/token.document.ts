import { Document, Model } from 'mongoose';
import { IUser } from '../user/user.document';

export interface IToken extends Document {
    key: string;
    value: string;
    expiresIn: string;
    useCount?: number;
    sender: IUser['_id'];
}

export interface ITokenModel extends Model<IToken> {}
