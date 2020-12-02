const { sign } = require('jsonwebtoken');
const User = require('../mongodb/schemas/user.schema');

const { userErrors } = require('../messages/error/mongoose.error');
/**
 * @type {import("express").RequestHandler}
 */
const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!req.user) {
            if (!username) throw new Error(userErrors.username_required);
            if (!password) throw new Error(userErrors.password_required);
        }

        const user = req.user ?? (await User.authenticate(username, password));
        const token = sign(
            { _id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '10 h' }
        );
        req.response = {
            code: 200,
            status: 'success',
            message: 'user exists',
            data: Object.assign(user, { token }),
        };
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * @type {import("express").RequestHandler}
 */
const signUp = async (req, res, next) => {
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
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = {
    signIn,
    signUp,
};
