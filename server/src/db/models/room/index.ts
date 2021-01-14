import { model } from 'mongoose';
import { IRoom, IRoomModel } from './room.document';
import RoomSchema from './room.schema';

const Room = model<IRoom, IRoomModel>('room', RoomSchema);

export default Room;
