const {
    dev: { mongoString },
} = require("../config/config.json");
//----------------------------------------------------------//
const mongoose = require("mongoose");

module.exports = () => {
    return mongoose
        .connect(mongoString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log(`Connected to mongodb ${mongoString}`);
        });
};
