const path = require('path');
const appDir = path.dirname(require.main.filename);
/**
 * @type {import('express').RequestHandler}
 */
const page = (req, res) => {
    res.sendFile(path.join(appDir, 'build', 'index.html'));
};

module.exports = { page };
