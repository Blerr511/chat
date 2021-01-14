import { JOIN_TO_RTC_CHANNEL, SEND_MESSAGE } from 'helpers/actions/constants';
import { ActionMiddleware } from 'helpers/utils/ActionMiddleware';
import actionController from './actionController';

const middleware = new ActionMiddleware();
middleware.use(
    SEND_MESSAGE,
    actionController.dataType('data', 'roomId'),
    ...actionController.onMessage
);
middleware.use(
    JOIN_TO_RTC_CHANNEL,
    actionController.dataType('roomId'),
    ...actionController.onJoinRtc,
);
// REVIEW - try to find batter way to do this 'next' call
export const actionEvent = (next, socket, io, { type, payload }) => {
    new Promise((res) => {
        middleware.call(type)(socket, io)(payload, res);
    }).then(next);
};
