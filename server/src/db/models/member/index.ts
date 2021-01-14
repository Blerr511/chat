import { model } from 'mongoose';
import { IMember, IMemberModel } from './member.document';
import MemberSchema from './member.schema';

const Member = model<IMember, IMemberModel>('member', MemberSchema);

export default Member;
