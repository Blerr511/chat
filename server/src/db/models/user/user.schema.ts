import { Schema } from 'mongoose';
import * as Crypto from 'crypto';
import { IUser } from './user.document';
import { HttpError } from 'errors/HttpError';

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true,
            minlength: [6, 'Username min length is 6 symbols'],
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
            select: false,
            minlength: [8, 'Password needs to contains minimum 8 letters'],
            set: function (password) {
                return Crypto.pbkdf2Sync(
                    password,
                    this.salt,
                    1000,
                    64,
                    'sha512'
                ).toString('hex');
            },
        },
        salt: {
            type: String,
            select: false,
            default: () => Crypto.randomBytes(16).toString('hex'),
        },
        socketId: { type: String },
        online: { type: Boolean, default: false },
        firstName: {
            type: String,
            required: [true, 'First Name is required.'],
        },
        lastName: { type: String, required: [true, 'Last Name is required.'] },
    },
    { versionKey: false }
);
UserSchema.path('email').validate(function (email) {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'Incorrect e-mail.');

/**
 * Comparing password hashes
 * @param {String} password - password to compare
 * @param {String} hash - user password hash
 * @param {String} salt - user hash salt
 * @return {Boolean}
 */
UserSchema.statics.comparePasswords = (password, hash, salt) => {
    const _hash = Crypto.pbkdf2Sync(
        password,
        salt,
        1000,
        64,
        'sha512'
    ).toString('hex');
    return _hash === hash;
};

/**
 * Authenticate the user or throw error if not found or incorrect password
 * @param {String} username - username or email
 * @param {String} password - password
 * @return {Promise<Object,String>}
 * @throws {String}
 */
UserSchema.statics.authenticate = async function (username, password) {
    const user = await this.findOne({
        $or: [{ username }, { email: username }],
    })
        .select('+password +salt')
        .lean();
    if (!user)
        throw new HttpError('User not found', 404, {
            username: { type: 'error', message: 'User not found' },
        });
    if (!this.comparePasswords(password, user.password, user.salt))
        throw new HttpError('Invalid password', 400, {
            password: { type: 'error', message: 'Invalid password' },
        });
    delete user.password;
    delete user.salt;
    return user;
};

/**
 * Finding users which usernames includes in array
 * @param {Array.<String>} usernames
 */
UserSchema.statics.findManyByUsernames = async function (usernames) {
    const users = await this.find({ username: { $in: usernames } });
    return users;
};

export default UserSchema;
