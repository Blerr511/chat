const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Crypto = require("crypto");
const { userErrors } = require("../../messages/error/mongoose.error");

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        socketId: { type: String, select: false },
        online: { type: Boolean, default: false },
    },
    { versionKey: false }
);

/**
 * Setting user password hash
 * @param {String} password
 * @return {void}
 */
UserSchema.methods.setPassword = function (password) {
    this.salt = Crypto.randomBytes(16).toString("hex");
    this.password = Crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
};
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
        "sha512"
    ).toString("hex");
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
        .select("+password +salt")
        .lean();
    if (!user) throw new Error(userErrors.user_not_found);
    if (!this.comparePasswords(password, user.password, user.salt))
        throw new Error(userErrors.user_not_found);
    delete user.password;
    delete user.salt;
    return user;
};

/**
 * Finding users which usernames includes in array
 * @param {Array.<String>} usernames
 */
UserSchema.statics.findManyByUsernames = async function (usernames) {
    const users = await User.find({ username: { $in: usernames } });
    if (!users) throw new Error(userErrors.no_users);
    return users;
};

const User = model("user", UserSchema);

module.exports = User;
