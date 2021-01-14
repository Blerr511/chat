import { Schema } from 'mongoose';

import MemberSchema from '../member/member.schema';
import { IServer } from './server.document';
import RTCRoom from '../rtcRoom';

const ServerSchema = new Schema<IServer>({
    name: { type: String, required: [true, 'Server name is required'] },
    members: {
        type: [MemberSchema],
    },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'room' }],
    rtcRooms: [{ type: Schema.Types.ObjectId, ref: 'rtc-room' }],
    icon: { type: String, default: null },
});

ServerSchema.statics.disconnectEverything = async function (userId) {
    const result = await RTCRoom.update(
        { 'members.user': userId },
        { $pull: { members: userId } }
    );
    if (!result.ok) throw new Error('Some error happens');
    return result;
};

export default ServerSchema;
