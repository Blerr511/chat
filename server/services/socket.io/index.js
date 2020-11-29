const SocketApp = require('../../helpers/socket/SocketApp');
const controller = require('../../helpers/socket/events/controller');

const IOService = (server) => {
    const socketService = new SocketApp(server);
    socketService.use('connect', controller.connect);
    socketService.use('auth', controller.auth);
    socketService.use('action', controller.action);
    socketService.catch(controller.catch);
    return socketService.IO;
};

module.exports = IOService;
