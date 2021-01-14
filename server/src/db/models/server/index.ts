import { model } from 'mongoose';
import { IServer, IServerModel } from './server.document';
import ServerSchema from './server.schema';

const Server = model<IServer, IServerModel>('server', ServerSchema);

export default Server;
