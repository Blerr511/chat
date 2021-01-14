import { CLIENT_ACTION_TYPES } from 'constants/socketEvents.constant';
import { ACTION_TYPES } from 'helpers/actions/constants';

export type ActionTypes = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

export interface Action<P = any> {
    type: ActionTypes;
    payload: P;
}

export type ActionCreator = <P = any>(payload?: P) => Action<P>;

export type ClientActionTypes = typeof CLIENT_ACTION_TYPES[keyof typeof CLIENT_ACTION_TYPES];
