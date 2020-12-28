const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const config = require('../../config');
const router = require('../../routes');
const authMiddleware = require('../../middleware/auth.middleware');
const responseMiddleware = require('../../middleware/response.middleware');
const catchHelper = require('../../helpers/catch.helper');

const app = express();

app.use(bodyParser.json());
app.use(express.static('build'));
app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.urlencoded({ extended: true }));
// --------- API CALLS ----------- //
app.use('/api/register', router.register, responseMiddleware);
// ------------------------------- //
app.use('/api/*', authMiddleware);
app.use('/api/login', router.login);
app.use('/api/users', router.users);
app.use('/api/token', router.invite);
app.use('/api/server', router.server);
app.use('/api/permissions', router.permission);
// ------------------------------- //
app.use('/api/*', catchHelper);
// ------------------------------- //
app.use('/api/*', responseMiddleware);
// ------------------------------- //
app.get('/*', router.front);

module.exports = app;
