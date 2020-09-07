const { mongoString } = require("../config");
// ---------------------------------------------------------- //
const mongoose = require("mongoose");
/**
 * Connecting to mongoDb
 * @return {Promise<void>}
 */
module.exports = () => {
    return mongoose
        .connect(process.env.MONGO_STRING || mongoString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(
                "Connected to mongodb " +
                    (process.env.MONGO_STRING || mongoString).blue
            );
        })
        .catch((err) => {
            console.log(
                `Connection to mongodb ${
                    process.env.MONGO_STRING || mongoString
                } failed`
            );
            console.error(err);
        });
};
