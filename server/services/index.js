require('colors');

const app = require('./express');
const SocketService = require('./socket.io');
const server = require('http').createServer(app);
const AwsS3Service = require('./aws/S3');
const initServices = () => {
    AwsS3Service.start();
    SocketService.start(server);
    server.listen(process.env.PORT || 8080, () => {
        console.info(
            'Listening to port - ' + (process.env.PORT || 8080).toString().blue
        );
    });
};

module.exports = initServices;
