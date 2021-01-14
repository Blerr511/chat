import { model } from 'mongoose';
import { IRole, IRoleModel } from './role.document';
import RoleSchema from './role.schema';

const Role = model<IRole, IRoleModel>('role', RoleSchema);

export default Role;
