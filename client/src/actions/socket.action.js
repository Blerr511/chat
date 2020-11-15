import {validate} from 'json-schema';

import roomSchema from '../schemas/room.schema';
import messageSchema from '../schemas/message.schema';
import {auth} from '../helpers/socket.io';

export const SOCKET_AUTH_REQUEST = 'SOCKET_AUTH_REQUEST';
export const SOCKET_AUTH_SUCCESS = 'SOCKET_AUTH_SUCCESS';
export const SOCKET_AUTH_FAILURE = 'SOCKET_AUTH_FAILURE';

const SERVER_MESSAGE_RECEIVED = {
	type: 'SERVER_MESSAGE_RECEIVED',
	schema: {
		type: 'object',
		properties: {
			serverId: {
				type: 'string',
				required: true
			},
			roomId: {
				type: 'string',
				required: 'true'
			},
			data: messageSchema
		}
	}
};

const NEW_ROOM_CREATED = {
	type: 'NEW_ROOM_CREATED',
	schema: {
		type: 'object',
		properties: {
			serverId: {
				type: 'string',
				required: true
			},
			data: roomSchema
		}
	}
};

export const socketActions = {
	SERVER_MESSAGE_RECEIVED,
	NEW_ROOM_CREATED
};
/**
 * Checking if action is valid and defined into socketActions
 * @param {*} action
 * @return {{valid:boolean,error:string}}
 */
export const isValid = action => {
	if (typeof action !== 'object' || typeof action.type !== 'string')
		return {
			valid: false,
			error: `action must be plain object with type property, received ${typeof action}`
		};
	if (!socketActions.hasOwnProperty(action.type))
		return {
			valid: false,
			error: `action ${action.type} not defined in client side`
		};
	if (!socketActions[action.type].schema) return {valid: true, error: null};
	const v = validate(action.payload, socketActions[action.type].schema);
	return {valid: v.valid, error: v.errors};
};

export const socketAuthAction = token => (dispatch, getState) => {

	const request = payload => {
		return dispatch({type: SOCKET_AUTH_REQUEST, payload});
	};
	const success = payload => {
		return dispatch({type: SOCKET_AUTH_SUCCESS, payload});
	};
	const failure = error => {
		return dispatch({type: SOCKET_AUTH_FAILURE, payload: error});
	};
	request(token);
	return auth(token).then(success, failure);
};
