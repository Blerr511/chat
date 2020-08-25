const { verify, JsonWebTokenError, decode } = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const catchHelper = require("../helpers/catch.helper");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let token =
            req.headers["x-access-token"] || req.headers["authorization"];
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        verify(token, jwtSecret, (err, decoded) => {
            if (err) throw new Error("Token is not valid");
            else req.user = data;
        });
        req.response = {
            code: 200,
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};
