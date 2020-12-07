const Middleware = require('./Middleware');

class ActionMiddleware {
    /**
     * @type {Object.<string,Middleware>}
     */
    _events = {};
    use(event, ...handlers) {
        this._events[event] = this._events[event] || new Middleware();
        this._events[event].use(...handlers);
    }
    call(event) {
        return (...context) => {
            return (...payload) => {
                this._events[event] &&
                    this._events[event].call(...context)(...payload);
            };
        };
    }
}

module.exports = ActionMiddleware;
