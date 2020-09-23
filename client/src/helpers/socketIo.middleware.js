import initSocket from "./socket.io";
import { LOGIN_SUCCESS } from "../actions/auth.action";
import { _getMyRooms } from "../actions/room.action";
import { isValid } from "../actions/socket.action";

export const SOCKET_MESSAGE_RECEIVED = "SOCKET_MESSAGE_RECEIVED";
export const SOCKET_SEND_ACTION = "SOCKET_SEND_ACTION";
export const SOCKET_ACTION_TYPES = {
    SEND_MESSAGE: "SEND_MESSAGE",
};

export const SOCKET_CONNECTED = "SOCKET_CONNECTED";
export const SOCKET_SEND_MESSAGE = "SOCKET_SEND_MESSAGE";
export const SOCKET_ERROR = "SOCKET_ERROR";
export const SOCKET_NEW_ROOM = "SOCKET_NEW_ROOM";

export const sendSocketAction = (payload) => ({
    type: SOCKET_SEND_ACTION,
    payload,
});

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
                    store.dispatch({ type: SOCKET_CONNECTED });
                    console.info("Socket connected");
                    _socket = socket;
                    initSocketEvents(socket, store);
                })
                .catch((err) => {
                    console.error("Socket error - ", err);
                    store.dispatch({ type: SOCKET_ERROR, payload: err });
                });
        }
        if (action.type === SOCKET_SEND_ACTION) {
            // const { room, message } = action.payload;
            if (_socket) _socket.emit("action", action.payload);
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
    socket.on("action", (action) => {
        console.log(action)
        const { valid, error } = isValid(action);
        if (valid) {
            store.dispatch(action);
        } else if (process.env.NODE_ENV === "development")
            console.error("invalid action found ,", error);
    });
    // socket.on("message", (payload) => {
    //     store.dispatch({ type: SOCKET_MESSAGE_RECEIVED, payload });
    // });
    // socket.on("newRoom", (payload) => {
    //     store.dispatch({ type: SOCKET_NEW_ROOM, payload });
    //     store.dispatch(_getMyRooms());
    // });
};

export default createSocketIoMiddleware;
