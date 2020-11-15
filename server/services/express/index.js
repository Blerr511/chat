const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const config = require("../../config");
const controller = require("../../routes/controller");
const authMiddleware = require("../../middleware/auth.middleware");
const responseMiddleware = require("../../middleware/response.middleware");

const app = express();

app.use(bodyParser.json());
app.use(express.static("build"));
app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.urlencoded({ extended: true }));
// --------- API CALLS ----------- //
app.use("/api/register", controller.register);
// ------------------------------- //
app.use("/api/*", authMiddleware);
app.use("/api/room", controller.room);
app.use("/api/login", controller.login);
app.use("/api/users", controller.users);
app.use("/api/token", controller.invite);
app.use("/api/server", controller.server);
app.use("/api/permissions", controller.permission);
// ------------------------------- //
app.use("/api/*", responseMiddleware);
// ------------------------------- //
app.get("/*", controller.front);

module.exports = app;
