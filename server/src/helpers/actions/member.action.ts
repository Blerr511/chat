import { ActionCreator } from 'interfaces/Action.interface';
import { NEW_MEMBER } from './constants';

export const newMember: ActionCreator = (payload) => ({
    type: NEW_MEMBER,
    payload,
});
