import { Document, Model } from 'mongoose';
import { IRole } from '../role/role.document';
import { IUser } from '../user/user.document';

export interface IMember extends Document {
    user: IUser['_id'];
    role: IRole['_id'];
    setRole: (name: string) => Promise<void>;
}

export interface IMemberModel extends Model<IMember> {}
