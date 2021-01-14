import { Schema } from 'mongoose';
import Server from '../server';
import { IRTCRoom } from './RTCRoom.document';

const RTCRoomSchema = new Schema<IRTCRoom>(
    {
        name: {
            type: String,
            default: 'Voice Room',
        },
        server: { type: Schema.Types.ObjectId, ref: 'server' },
        members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    },
    {
        timestamps: false,
    }
);

RTCRoomSchema.statics.getRoomsOfUser = async function (user) {
    if (!user) throw new Error('User not found');

    const rooms = await this.find({ 'members.user': user })
        .populate('members.user members.role')
        .lean();
    if (!rooms) throw new Error('Rooms not found');
    return rooms;
};

RTCRoomSchema.methods.join = async function (user) {
    if (!user) throw new Error('User not found');
    for (let i = 0; i < this.members.length; i++) {
        const member = this.members[i];
        if (member.user === user)
            throw new Error('User already joined to channel');
    }
    const member = await Server.findById(this);
    if (!member) throw new Error('Member not found');
    this.members.push(member);
};

export default RTCRoomSchema;
