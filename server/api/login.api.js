const catchHelper = require("../helpers/catch.helper");
const User = require("../mongodb/schemas/user.schema");
const { jwtSecret } = require("../config");
const { sign } = require("jsonwebtoken");
/**
 * Handling login request
 * @param {ExpressRequest} req - request
 * @param {ExpressResponse} res - response
 * @param {ExpressNextFunction} next - next callback
 * @return {Promise<void>}
 */
module.exports = async (req, res, next) => {
    try {
        const { username, password } = req.query;
        const user = await User.authenticate(username, password);
        const token = sign(user, jwtSecret, { expiresIn: "10 h" });
        req.response = {
            code: 200,
            status: "success",
            message: "user exists",
            data: Object.assign(user, { token }),
        };
    } catch (error) {
        catchHelper(req, error);
    }
    next();
};
