const mongoose = require("mongoose");

// Define our token schema
const TokenSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        set: (v) => {
            if (!v) return undefined;
            return new Date(Date.now() + parseInt(v, 10) * 1000);
        },
        default: 3 * 30 * 24 * 3600 * 1000,
    },
    useCount: {
        type: Number,
        default: Infinity,
    },
});

// Expire at the time indicated by the expireAt field
TokenSchema.index({ expiresIn: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model("Token", TokenSchema);

module.exports = {
    TokenSchema,
    Token,
};
