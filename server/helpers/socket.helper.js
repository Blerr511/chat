const { io } = require("./createServer.helper");

const socketMap = {};

/**
 * Get socket by id
 * @param {String} socketId
 * @return {import("socket.io").Socket}
 */
const getConnectedSocket = (socketId) => io.sockets.connected[socketId];

const addSocketUser = (userId, socketId) => (socketMap[userId] = socketId);

const deleteSocketUser = (userId) => delete socketMap[userId];

/**
 * @param {String} userId
 * @returns {import("socket.io").Socket}
 */
const getSocketByUserId = (userId) => getConnectedSocket(socketMap[userId]);

module.exports = {
    getConnectedSocket,
    addSocketUser,
    deleteSocketUser,
    getSocketByUserId,
};
