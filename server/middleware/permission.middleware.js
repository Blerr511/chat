const { Server } = require("../db/schemas/server.schema");

/**
 * Checking permission for member
 * @param {String} permission
 * @param {Function} getServerId - selector to extract server id from request
 * @returns {import("express").RequestHandler}
 */
module.exports = (permission, getServerId = (req) => req.params.serverId) => {
  return async (req, res, next) => {
    try {
      const serverId = getServerId(req);
      const server = await Server.findById(serverId).populate(
        "members.user members.role"
      );
      if (!server) throw new Error("Server not found");
      for (let i = 0; i < server.members.length; i++) {
        const member = server.members[i];
        if (member.user._id.toString() === req.user._id) {
          if (member.role.hasPermission(permission)) break;
          else throw new Error("Permission denied");
        }
      }
      next();
    } catch (error) {
      res.status(403).send({
        status: "error",
        message: error.message ?? error,
      });
    }
  };
};
