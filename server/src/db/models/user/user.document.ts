import { Document, Model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    salt: string;
    socketId?: string;
    online: boolean;
    firstName: string;
    lastName: string;
}

export interface IUserModel extends Model<IUser> {
    comparePasswords: (password: string, hash: string, salt: string) => boolean;
    authenticate: (username: string, password: string) => Promise<IUser>;
    findManyByUsernames: (username: string) => Promise<IUser[]>;
}
