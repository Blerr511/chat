import { d_SOCKET_UNAUTHORIZED } from 'constants/socketEvents.constant';

const verifyOptions = {
    timeout: 3000,
    token: process.env.JWT_SECRET,
} as const;

export const requireAuth = (next, socket) => {
    socket.disconnectTimer = setTimeout(() => {
        socket.disconnect(d_SOCKET_UNAUTHORIZED);
    }, verifyOptions.timeout);
    next();
};
