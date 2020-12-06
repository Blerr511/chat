const RequiredError = require('../errors/api/Required.error');

module.exports = (...keys) => {
    /**
     * @type {import('express').RequestHandler}
     */
    return (req, res, next) => {
        try {
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const v = req.body[key];
                if (v === null || v === undefined)
                    throw new RequiredError(`${key} is required`);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};
