import { Schema } from 'mongoose';
import { IRole } from './role.document';

const RoleSchema = new Schema<IRole>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: { unique: true },
        },
        permissions: { type: [String], default: [] },
    },
    { versionKey: false }
);

RoleSchema.methods.hasPermission = function (permission) {
    if (this.name === 'admin') return true;
    return this.permissions.includes(permission);
};
RoleSchema.statics.initRoles = async function () {
    const user = await this.findOne({ name: 'user' });
    if (!user) {
        await this.create({ name: 'user' });
    }
    const admin = await this.findOne({ name: 'admin' });
    if (!admin) {
        await this.create({ name: 'admin' });
    }
};

export default RoleSchema;
