const invite = require("./invite.route");
const login = require("./login.route");
const permission = require("./permission.route");
const register = require("./register.route");
const server = require("./server.route");
const users = require("./users.route");
const front = require("./front.route");

module.exports = {
  invite,
  login,
  permission,
  register,
  server,
  users,
  front,
};
