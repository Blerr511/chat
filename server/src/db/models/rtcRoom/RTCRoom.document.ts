import { Document, Model } from 'mongoose';
import { IMember } from '../member/member.document';
import { IServer } from '../server/server.document';
import { IUser } from '../user/user.document';

export interface IRTCRoom extends Document {
    name: string;
    server: IServer['_id'];
    members: Array<IMember['_id']>;
    join: (user: IUser['_id']) => Promise<void>;
}

export interface IRTCModel extends Model<IRTCRoom> {
    getRoomsOfUser: (user: IMember['user']) => Promise<IRTCRoom[]>;
}
