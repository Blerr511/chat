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
const serverRoute = require("./routes/server.route");
const permissionRoute = require("./routes/permission.route");
const { configureAwsS3 } = require("./helpers/multer.helper");
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
app.use("/api/server", serverRoute, responseMiddleware);
app.use("/api/permissions", permissionRoute, responseMiddleware);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ---------- CONNECTING TO MONGODB AND SOCKET IO ----------- //
connectMongo();
connectHandler(io);
configureAwsS3();
// ---------------------------------------------------------- //
server.listen(process.env.PORT || config.PORT, () => {
    console.info("Listening to port - " + config.PORT.toString().blue);
});
