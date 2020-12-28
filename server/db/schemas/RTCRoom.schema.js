const { Schema, model, SchemaTypes } = require('mongoose');
const { Server } = require('./server.schema');

const RTCRoomSchema = new Schema(
    {
        name: {
            type: String,
            default: 'Voice Room',
        },
        server: { type: SchemaTypes.ObjectId, ref: 'server' },
        members: [{ type: SchemaTypes.ObjectId, ref: 'users' }],
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
    const member = await Server.findOne({ 'members.user': user });
    this.members.push(member);
};

const RTCRoom = model('rtc-room', RTCRoomSchema);

module.exports = {
    RTCRoom,
    RTCRoomSchema,
};
