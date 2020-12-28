const {
    SEND_MESSAGE,
    JOIN_TO_RTC_CHANNEL,
} = require('../../actions/constants');
const ActionMiddleware = require('../../utils/ActionMiddleware');
const actionController = require('./actionController');

const middleware = new ActionMiddleware();
middleware.use(
    SEND_MESSAGE,
    actionController.dataType('data', 'roomId'),
    actionController.onMessage.createMessage,
    actionController.onMessage.emitRoom
);
middleware.use(
    JOIN_TO_RTC_CHANNEL,
    actionController.dataType('roomId'),
    actionController.onJoinRtc.joinToRoom,
    actionController.onJoinRtc.emitSuccess
);
// REVIEW - try to find batter way to do this 'next' call
module.exports = (next, socket, io, { type, payload }) => {
    new Promise((res) => {
        middleware.call(type)(socket, io)(payload, res);
    }).then(next);
};
