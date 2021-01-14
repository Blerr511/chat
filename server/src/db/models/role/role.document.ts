import { Document, Model } from 'mongoose';

export interface IRole extends Document {
    name: string;
    permissions: string[];
    hasPermission: (perm: string) => boolean;
}

export interface IRoleModel extends Model<IRole> {
    initRoles: () => void;
}
