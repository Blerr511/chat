const SocketApp = require('../../helpers/socket/SocketApp');
const controller = require('../../helpers/socket/events/controller');
const adapter = require('./helper/socketAdapter');

const staticController = {
    auth: (next, socket) => {
        adapter.addUser(socket.user._id, socket);
        next();
    },
    disconnect: (next, socket) => {
        adapter.deleteUser(socket.user._id);
        next();
    },
};

const socketService = new SocketApp();
socketService.use('connect', controller.connect);
socketService.use('auth', controller.auth, staticController.auth);
socketService.use('action', controller.action);
socketService.use('disconnect', staticController.disconnect);

socketService.catch(controller.catch);

module.exports = socketService;
