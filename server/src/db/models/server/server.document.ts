import { Document, Model } from 'mongoose';
import { IMember } from '../member/member.document';
import { IRoom } from '../room/room.document';
import { IUser } from '../user/user.document';

export interface IServer extends Document {
    name: string;
    members: IMember[];
    rooms: Array<IRoom['_id']>;
    rtcRooms: Array<IRoom['_id']>;
    icon: string;
}

export interface IServerModel extends Model<IServer> {
    disconnectEverything: (userId: IUser['_id']) => any;
}
