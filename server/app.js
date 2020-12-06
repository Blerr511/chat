// ----------------------------------------------s------------ //
const connectMongo = require('./db/mongooseConnect');
// ---------------------------------------------------------- //
const initServices = require('./services');
// ---------- CONNECTING TO MONGODB AND SOCKET IO ----------- //
connectMongo();
initServices();
// ---------------------------------------------------------- //
