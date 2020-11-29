const { sign } = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../mongodb/schemas/user.schema');

const { userErrors } = require('../messages/error/mongoose.error');
/**
 * Handling login request
 * @param {ExpressRequest} req - request
 * @param {ExpressResponse} res - response
 * @param {ExpressNextFunction} next - next callback
 * @return {Promise<void>}
 */
const handleLogin = async (req, res, next) => {
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

router.post('/', handleLogin);

module.exports = router;
