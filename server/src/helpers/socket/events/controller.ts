import { authEvent as auth } from './auth.event';
import { requireAuth as connect } from './connect.event';
import { actionEvent as action } from './action.event';
import { catchEvent } from './catch.event';

const ioController = {
    auth,
    connect,
    action,
    catch: catchEvent,
};

export default ioController;
