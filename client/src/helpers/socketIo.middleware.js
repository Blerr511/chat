import initSocket, {auth} from './socket.io';
import {LOGIN_SUCCESS} from '../actions/auth.action';
import {_getMyRooms} from '../actions/room.action';
import {isValid} from '../actions/socket.action';
import socket from './socket.io';

export const SOCKET_MESSAGE_RECEIVED = 'SOCKET_MESSAGE_RECEIVED';
export const SOCKET_SEND_ACTION = 'SOCKET_SEND_ACTION';
export const SOCKET_ACTION_TYPES = {
	SEND_MESSAGE: 'SEND_MESSAGE'
};

export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
export const SOCKET_SEND_MESSAGE = 'SOCKET_SEND_MESSAGE';
export const SOCKET_ERROR = 'SOCKET_ERROR';
export const SOCKET_NEW_ROOM = 'SOCKET_NEW_ROOM';

export const sendSocketAction = payload => ({
	type: SOCKET_SEND_ACTION,
	payload
});

export const sendSocketMessage = payload => ({
	type: SOCKET_SEND_MESSAGE,
	payload
});
/**
 * Creates redux middleware which tracking store and socket events
 * @return {import("redux").Middleware}
 */
const createSocketIoMiddleware = () => {
	return store => {
		initSocketEvents(socket, store);
		return next => action => {
			if (action.type === SOCKET_SEND_ACTION) {
				if (socket) socket.emit('action', action.payload);
			}
			return next(action);
		};
	};
};
/**
 * @param {SocketIOClient.Socket} socket
 * @param {import("redux").Store} store
 */
const initSocketEvents = (socket, store) => {
	socket.removeAllListeners();
	socket.on('action', action => {
		const {valid, error} = isValid(action);
		if (valid) {
			store.dispatch(action);
		} else if (process.env.NODE_ENV === 'development')
			console.error('invalid action found ,', error);
	});
	// store.subscribe(console.log);
	// socket.on("message", (payload) => {
	//     store.dispatch({ type: SOCKET_MESSAGE_RECEIVED, payload });
	// });
	// socket.on("newRoom", (payload) => {
	//     store.dispatch({ type: SOCKET_NEW_ROOM, payload });
	//     store.dispatch(_getMyRooms());
	// });
};

export default createSocketIoMiddleware;
