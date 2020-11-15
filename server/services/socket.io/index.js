const connectHandler = require("../../helpers/socket/connect.handler");

const IOService = (server) => {
  const io = require("socket.io")(server);
  connectHandler(io);
  return io;
};

module.exports = IOService;
