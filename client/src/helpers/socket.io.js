import io from 'socket.io-client';

export const d_SOCKET_UNAUTHORIZED = 'unauthorized';
export const d_SOCKET_AUTHENTICATED = 'authenticated';
export const d_SOCKET_MESSAGE = 'message';
export const d_SOCKET_AUTH = 'auth';

const socket = io(process.env.REACT_APP_SOCKET, {autoConnect: false});

export const auth = jwtToken =>
	new Promise((res, rej) => {
		socket.connect();
		socket.on('connect', () => {
			socket.emit('auth', {token: jwtToken});
		});
		socket.on(d_SOCKET_AUTHENTICATED, () => {
			res(socket);
		});
		const handleError = (...argv) => {
			rej(...argv);
			socket.removeEventListener('error', handleError);
		};
		socket.addEventListener('error', handleError);
	});
export default socket;
