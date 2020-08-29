const catchHelper = require("../helpers/catch.helper");
const User = require("../mongodb/schemas/user.schema");
const { jwtSecret } = require("../config");
const { sign } = require("jsonwebtoken");
const { userErrors } = require("../messages/error/mongoose.error");
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

        if (!req.user) {
            if (!username) throw new Error(userErrors.username_required);
            if (!password) throw new Error(userErrors.password_required);
        }

        const user = req.user ?? (await User.authenticate(username, password));
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
