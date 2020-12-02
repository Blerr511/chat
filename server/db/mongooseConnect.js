const { mongoString } = require("../config");
// ---------------------------------------------------------- //
const mongoose = require("mongoose");
const { Role } = require("./schemas/role.schema");
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
      useFindAndModify: false,
    })
    .then(() => {
      Role.initRoles();
      console.log(
        "Connected to mongodb " + (process.env.MONGO_STRING || mongoString).blue
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
