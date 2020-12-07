const AuthFailedError = require('../../../../errors/socket/AuthFailed.error');
const InvalidDataError = require('../../../../errors/socket/InvalidData.error');

const dataType = (...required) => {
    return async (next, socket, io, payload) => {
        try {
            if (!socket.user) {
                return new AuthFailedError(`socket user not found`);
            }
            if (typeof payload !== 'object') {
                return next(
                    new InvalidDataError(
                        `socket action payload must be type object, received ${typeof payload} `
                    )
                );
            }
            for (let i = 0; i < required.length; i++) {
                const key = required[i];
                if (!payload[key])
                    throw new InvalidDataError(`property ${key} required`);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = dataType;
