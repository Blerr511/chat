import { ActionCreator } from 'interfaces/Action.interface';
import { SERVER_MESSAGE_RECEIVED } from './constants';

export const sendMessage: ActionCreator = (payload) => ({
    type: SERVER_MESSAGE_RECEIVED,
    payload,
});
