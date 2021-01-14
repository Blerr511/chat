class SocketAdapter {
    _connectedUsers = new Map();
    constructor() {
        this.addUser = this.addUser.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    addUser(userId, socket) {
        if (typeof userId !== 'string')
            throw new Error(
                `addUser userId must be type string , received ${typeof userId}`
            );
        return this._connectedUsers.set(String(userId), socket);
    }
    /**
     * @param {*} userId
     * @returns {import("socket.io").Socket}
     */
    getByUserId(userId) {
        if (typeof userId !== 'string')
            throw new Error(
                `getByUserId userId must be type string , received ${typeof userId}`
            );
        return this._connectedUsers.get(String(userId));
    }
    deleteUser(userId) {
        if (typeof userId !== 'string')
            throw new Error(
                `deleteUser userId must be type string , received ${typeof userId}`
            );
        return this._connectedUsers.delete(String(userId));
    }
}

const adapter = new SocketAdapter();

export default adapter;
