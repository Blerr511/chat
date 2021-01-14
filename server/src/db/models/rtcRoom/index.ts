import { model } from 'mongoose';
import { IRTCModel, IRTCRoom } from './RTCRoom.document';
import RTCRoomSchema from './RTCRoom.schema';

const RTCRoom = model<IRTCRoom, IRTCModel>('rtc-room', RTCRoomSchema);

export default RTCRoom;
