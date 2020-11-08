const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// ---------------------------------------------------------- //
const responseMiddleware = require('../../middleware/response.middleware');
const authMiddleware = require('../../middleware/auth.middleware');
const controller = require('../../routes/controller');
const config = require('../../config');

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
// --------- API CALLS ----------- //
app.use('/api/register', controller.register);
// ------------------------------- //
app.use('/api/*', authMiddleware);
app.use('/api/login', controller.login);
app.use('/api/room', controller.room);
app.use('/api/users', controller.users);
app.use('/api/server', controller.server);
app.use('/api/permissions', controller.permission);
app.use('/api/token', controller.invite);
app.use('/api/*', responseMiddleware);
// ------------------------------- //
app.get('/*', controller.front);

module.exports = app;
