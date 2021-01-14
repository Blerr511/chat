import { Middleware } from './Middleware';

export class ActionMiddleware {
    /**
     * @type {Object.<string,Middleware>}
     */
    _events = {};
    use(event, ...handlers) {
        this._events[event] = this._events[event] || new Middleware();
        this._events[event].use(...handlers);
    }
    catch(event, handler) {
        this._events[event].catch(handler);
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
