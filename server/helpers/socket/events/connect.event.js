const verifyOptions = {
    timeout: 3000,
    token: process.env.JWT_SECRET,
};
const requireAuth = (next, socket) => {
    socket.disconnectTimer = setTimeout(() => {
        socket.disconnect(d_SOCKET_UNAUTHORIZED);
    }, verifyOptions.timeout);
    next();
};

module.exports = requireAuth;
