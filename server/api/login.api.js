const catchHelper = require("../helpers/catch.helper");
const User = require("../mongodb/schemas/user.schema");
const { jwtSecret } = require("../config");
const { sign } = require("jsonwebtoken");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports = async (req, res, next) => {
    try {
        const { username, password } = req.query;
        const user = await User.findOne({
            $or: [{ username }, { email: username }],
        }).lean();

        if (!user) throw new Error("User not found");
        //----------------------------------------------------------//
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
