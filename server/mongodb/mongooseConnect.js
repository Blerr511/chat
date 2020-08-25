const { mongoString } = require("../config");
//----------------------------------------------------------//
const mongoose = require("mongoose");

module.exports = () => {
    return mongoose
        .connect(mongoString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to mongodb " + mongoString.blue);
        });
};
