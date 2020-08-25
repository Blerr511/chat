const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Crypto = require("crypto");

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
    },
    { timestamps: { createdAt: "created_at" }, versionKey: false }
);

UserSchema.methods.setPassword = function (password) {
    this.salt = Crypto.randomBytes(16).toString("hex");
    this.password = Crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512");
};

UserSchema.methods.validatePassword = (password) => {
    const _hash = Crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512");
    return this.password === _hash;
};

const User = model("user", UserSchema);

module.exports = User;
