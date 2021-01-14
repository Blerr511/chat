import 'colors';
import S3Service from './aws/S3';
import app from './express';
import socketService from './socket.io';
require('colors');

const server = require('http').createServer(app);
const initServices = () => {
    S3Service.start();
    socketService.start(server);
    server.listen(process.env.PORT || 8080, () => {
        console.info(
            'Listening to port - ' + (process.env.PORT || 8080).toString().blue
        );
    });
};

export default initServices;
