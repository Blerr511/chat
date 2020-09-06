import initSocket from "./socket.io";
import { LOGIN_SUCCESS } from "../actions/auth.action";
import { _getMyRooms } from "../actions/room.action";

export const SOCKET_MESSAGE_RECEIVED = "SOCKET_MESSAGE_RECEIVED";
export const SOCKET_SEND_MESSAGE = "SOCKET_SEND_MESSAGE";
export const SOCKET_ERROR = "SOCKET_ERROR";
export const SOCKET_NEW_ROOM = "SOCKET_NEW_ROOM";

export const sendSocketMessage = (payload) => ({
    type: SOCKET_SEND_MESSAGE,
    payload,
});
/**
 * Creates redux middleware which tracking store and socket events
 * @param {SocketIOClient.ConnectOpts} [socketOptions] - socket options
 * @return {import("redux").Middleware}
 */
const createSocketIoMiddleware = (socketOptions) => {
    /**
     * @type {SocketIO.Socket}
     */
    let _socket = null;
    return (store) => (next) => (action) => {
        if (action.type === LOGIN_SUCCESS) {
            initSocket(action.payload.token, socketOptions)
                .then((socket) => {
                    console.info("Socket connected");
                    _socket = socket;
                    initSocketEvents(socket, store);
                })
                .catch((err) => {
                    console.error("Socket error - ", err);
                    store.dispatch({ type: SOCKET_ERROR, payload: err });
                });
        }
        if (action.type === SOCKET_SEND_MESSAGE) {
            const { room, message } = action.payload;
            if (room && message && _socket)
                _socket.emit("message", { room, message });
        }
        return next(action);
    };
};
/**
 * @param {SocketIOClient.Socket} socket
 * @param {import("redux").Store} store
 */
const initSocketEvents = (socket, store) => {
    socket.removeAllListeners();
    socket.on("message", (payload) => {
        store.dispatch({ type: SOCKET_MESSAGE_RECEIVED, payload });
    });
    socket.on("newRoom", (payload) => {
        store.dispatch({ type: SOCKET_NEW_ROOM, payload });
        store.dispatch(_getMyRooms());
    });
};

export default createSocketIoMiddleware;
