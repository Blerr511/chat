import token from './token.controller';
import auth from './auth.controller';
import _static from './static.controller';
import permission from './permission.controller';
import server from './server.controller';

const controller = {
    token,
    auth,
    static: _static,
    permission,
    server,
};

export default controller;
