const User = require("../mongodb/schemas/user.schema");
const Crypto = require("crypto");
//----------------------------------------------------------//
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

module.exports = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password))
            throw new Error("Username , password and email is required");

        //----------------------------------------------------------//
        const existUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existUser)
            throw new Error("Username or email already using by other user");
        //----------------------------------------------------------//

        const user = new User({
            username,
            email,
        });
        await user.setPassword(password);
        await user.save();
        req.response = {
            status: "success",
            message: "Success register",
            code: 200,
        };
    } catch (error) {
        req.response = {
            status: "error",
            message: error.message ?? error,
            code: 400,
        };
    }

    next();
};
