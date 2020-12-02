const path = require("path");

/**
 * @type {import('express').RequestHandler}
 */
const page = (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
};

module.exports = { page };
