const { dev, prod } = require("./config.json");
module.exports = process.env.NODE_ENV === "prod" ? prod : dev;