const io = require('socket.io');
const Middleware = require('../utils/Middleware');

/**
 * @callback socketHandler
 * @param {function} next
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io).Server} io
 * @param {any} data
 */

/**
 * @callback socketCatchHandler
 * @param {Error} error
 * @param {import('socket.io').Socket} socket
 * @param {import('socket.io).Server} io
 */

module.exports = class SocketApp {
    /**
     * @type {Object.<string,Middleware>}
     */
    events = {};

    constructor(server) {
        this.io = io(server);
        this.io.on('connect', (socket) => {
            this.events.connect?.call(socket);
            for (const event in this.events) {
                if (this.events.hasOwnProperty(event)) {
                    const middleware = this.events[event];
                    socket.on(event, middleware.call(socket, io));
                }
            }
        });
    }
    /**
     *
     * @param {string} event
     * @param  {...socketHandler} handlers
     */
    use(event, ...handlers) {
        if (!this.events[event]) this.events[event] = new Middleware();
        this.events[event].use(...handlers);
    }
    /**
     * @param {socketCatchHandler} handler
     */
    catch(handler) {
        for (const event in this.events) {
            if (this.events.hasOwnProperty(event)) {
                const middleware = this.events[event];
                middleware.catch(handler);
            }
        }
    }
    get IO() {
        return this.io;
    }
};
