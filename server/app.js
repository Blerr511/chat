const app = require('./services/express');
const server = require('http').createServer(app);
const createIo = require('./services/socket.io');
createIo(server);
// ----------------------------------------------s------------ //
const connectMongo = require('./mongodb/mongooseConnect');
const AWS_S3 = require('./helpers/aws/S3');
// ---------- CONNECTING TO MONGODB AND SOCKET IO ----------- //
connectMongo();
AWS_S3.configureAwsS3();
// ---------------------------------------------------------- //
server.listen(process.env.PORT || 8080, () => {
    require('colors');
    console.info(
        'Listening to port - ' + (process.env.PORT || 8080).toString().blue
    );
});
