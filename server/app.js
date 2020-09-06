require("colors");
const config = require("./config");
const express = require("express");
const { server, io, app } = require("./helpers/createServer.helper");

const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// ---------------------------------------------------------- //
const connectMongo = require("./mongodb/mongooseConnect");
const responseMiddleware = require("./middleware/response.middleware");
const loginApi = require("./routes/login.route");
const registerApi = require("./routes/register.api");
const authMiddleware = require("./middleware/auth.middleware");
const connectHandler = require("./helpers/socket/connect.handler");
const roomApi = require("./routes/room.route");
const usersRoute = require("./routes/users.route");
// ----------------------------------------------s------------ //
app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));
// ------------------------------- //
app.post("/api/register", registerApi, responseMiddleware);
// ------------------------------- //
app.use("/api/*", authMiddleware);
app.use("/api/login", loginApi, responseMiddleware);
app.use("/api/room", roomApi, responseMiddleware);
app.use("/api/users", usersRoute, responseMiddleware);
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ---------- CONNECTING TO MONGODB AND SOCKET IO ----------- //
connectMongo();
connectHandler(io);
// ---------------------------------------------------------- //
server.listen(config.PORT, () => {
    console.info("Listening to port - " + config.PORT.toString().blue);
});
