const User = require('../mongodb/schemas/user.schema');
const catchHelper = require('../helpers/catch.helper');
const router = require('express').Router();

// ---------------------------------------------------------- //
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const onRegister = async (req, res, next) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        const requiredFields = {
            username: 'Username',
            email: 'Email',
            password: 'password',
            firstName: 'First Name',
            lastName: 'Last Name',
        };
        for (const key in requiredFields) {
            if (!req.body[key])
                throw new Error(`${requiredFields[key]} is required`);
        }
        // ----------------------------------------------------------//
        const existUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existUser)
            throw new Error('Username or email already using by other user');
        // ---------------------------------------------------------- //

        const user = new User({
            username,
            email,
            firstName,
            lastName,
        });
        await user.setPassword(password);
        await user.save();
        req.response = {
            status: 'success',
            message: 'Success register',
            code: 200,
        };
    } catch (error) {
        catchHelper(req, error);
    }

    next();
};

module.exports = router.post('/', onRegister);
