import { SocketApp } from 'helpers/socket/SocketApp';
import controller from 'helpers/socket/events/controller'; //FIXME
import adapter from './helper/socketAdapter';
import actionController from 'helpers/socket/events/actionController';
import Server from 'db/models/server';

const staticController = {
    auth: (next, socket) => {
        adapter.addUser(socket.user._id, socket);
        next();
    },
    disconnect: (next, socket) => {
        if (socket.user) adapter.deleteUser(socket.user._id);
        next();
    },
};

const socketService = new SocketApp();

socketService.use('connect', controller.connect);
socketService.use('auth', controller.auth, staticController.auth);
socketService.use(
    'action',
    actionController.dataType('type'),
    controller.action
);
socketService.use(
    'disconnect',
    (next, socket) => {
        Server.disconnectEverything(socket.user._id);
        next();
    },
    staticController.disconnect
);

socketService.catch(controller.catch);

export const IO = socketService.IO;
export default socketService;
