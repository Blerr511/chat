require('colors');

const app = require('./express');
const io = require('./socket.io');
const server = require('http').createServer(app);
const AwsS3Service = require('./aws/S3');
const initServices = () => {
    AwsS3Service.start();
    io.IO.listen(server);
    server.listen(process.env.PORT || 8080, () => {
        console.info(
            'Listening to port - ' + (process.env.PORT || 8080).toString().blue
        );
    });
};

module.exports = initServices;
