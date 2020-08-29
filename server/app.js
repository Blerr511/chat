require("colors");
const config = require("./config");
const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const cors = require("cors");
// ---------------------------------------------------------- //
const connectMongo = require("./mongodb/mongooseConnect");
const responseMiddleware = require("./middleware/response.middleware");
const loginApi = require("./api/login.api");
const registerApi = require("./api/register.api");
const authMiddleware = require("./middleware/auth.middleware");
const connectHandler = require("./helpers/socket/connect.handler");
const roomApi = require("./api/room.api");
// ---------------------------------------------------------- //
app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ------------------------------- //
app.post("/api/register", registerApi, responseMiddleware);
// ------------------------------- //
app.use("*", authMiddleware);
app.get("/api/login", loginApi, responseMiddleware);
app.get("/api/room", roomApi, responseMiddleware);
app.get("/api/test", responseMiddleware);

// ---------- CONNECTING TO MONGODB AND SOCKET IO ----------- //
connectMongo();
connectHandler(io);
// ---------------------------------------------------------- //
server.listen(config.PORT, () => {
    console.info("Listening to port - " + config.PORT.toString().blue);
});
