/**
 * @callback handler
 * @param {function} next
 * @param {any} context
 */

/**
 * @callback catchHandler
 * @param {Error} error
 * @param {any} context
 */

class Middleware {
    _handlers = [];
    _catch = null;
    constructor() {
        this.use = this.use.bind(this);
        this.call = this.call.bind(this);
    }
    /**
     * @param {...handler} handlers
     */
    use(...handlers) {
        handlers.forEach((v) => {
            if (typeof v !== 'function')
                throw new Error(
                    `Middleware.use handler argument must be a function , received ${typeof v}`
                );
        });

        this._handlers.push(...handlers);
    }
    /**
     * @type {catchHandler}
     */
    catch(handler) {
        this._catch = handler;
    }

    call(...context) {
        return (...arg) => {
            const handlers = this._handlers;

            /**
             * @param  {...function} handlers
             */
            function* applyMiddleware() {
                let index = 0;
                while (index < handlers.length) yield handlers[index++];
            }

            const gen = applyMiddleware();
            let argv = null;
            const next = (err) => {
                if (err) {
                    this._catch?.call(null, err, ...context, ...argv);
                    return;
                }
                const ir = gen.next();
                if (!ir.done && !err) {
                    ir.value.call(null, next, ...context, ...argv);
                }
            };
            argv = arg;
            next();
        };
    }
}

module.exports = Middleware;
