import { Middleware } from 'helpers/utils/Middleware';
import { Service } from 'interfaces/Service';
import io from 'socket.io';

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
export class SocketApp implements Service {
    /**
     * @type {Object.<string,Middleware>}
     */
    events: Record<string, Middleware> = {};
    io: io.Server;
    constructor() {
        this.io = io();
        this.io.on('connect', (socket) => {
            this.events.connect?.call(socket, this.io);
            for (const event in this.events) {
                if (this.events.hasOwnProperty(event)) {
                    const middleware = this.events[event];
                    socket.on(event, middleware.call(socket, this.io));
                }
            }
        });
        this.use = this.use.bind(this);
        this.catch = this.catch.bind(this);
    }
    /**
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
    start(server) {
        this.IO.listen(server);
    }
}
