const { verify } = require("jsonwebtoken");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw new Error(err);
      if (decoded.exp < Date.now() / 1000)
        throw new Error("Token is out of date");
      delete decoded.iat;
      delete decoded.exp;
      req.user = decoded;
    });
    req.response = {
      code: 200,
    };
    next();
  } catch (error) {
    if (req.baseUrl === "/api/login") next();
    else
      res.status(404).send({
        status: "error",
        message: error.message ?? error,
      });
  }
};
