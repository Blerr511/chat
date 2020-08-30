import io from "socket.io-client";

export const d_SOCKET_UNAUTHORIZED = "unauthorized";
export const d_SOCKET_AUTHENTICATED = "authenticated";
export const d_SOCKET_MESSAGE = "message";
export const d_SOCKET_AUTH = "auth";
/**
 * Creating socket connection and authenticating
 * @param {String} jwtToken - user jwt token
 * @param {SocketIOClient.ConnectOpts} [socketOptions] - socket options
 * @return {Promise<SocketIO.Socket>}
 */
const initSocket = (jwtToken, socketOptions) => {
    return new Promise((res, rej) => {
        const socket = io(process.env.REACT_APP_SOCKET, socketOptions);
        socket.on("connect", () => {
            socket.emit("auth", { token: jwtToken });
        });
        socket.on(d_SOCKET_AUTHENTICATED, () => {
            res(socket);
        });
        socket.on("error", (err) => {
            rej(err);
        });
    });
};

export default initSocket;
