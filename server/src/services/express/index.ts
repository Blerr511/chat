import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import router from 'routes';
import config from 'config/index';
import authMiddleware from 'middleware/auth.middleware';
import responseMiddleware from 'middleware/response.middleware';
import catchHelper from 'helpers/catch.helper';

const app = express();

app.use(bodyParser.json());
app.use(express.static('build'));
app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.urlencoded({ extended: true }));
// --------- API CALLS ----------- //
app.use('/api/register', router.register, responseMiddleware);
// ------------------------------- //
app.use('/api/login', router.login);
app.use('/api/*', authMiddleware);
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

export default app;
