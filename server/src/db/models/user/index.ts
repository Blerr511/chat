import { model } from 'mongoose';
import { IUser, IUserModel } from './user.document';
import UserSchema from './user.schema';

const User = model<IUser, IUserModel>('user', UserSchema);

export default User;
