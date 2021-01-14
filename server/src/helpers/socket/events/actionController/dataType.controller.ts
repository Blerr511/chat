import { IoError } from 'errors/IoError';

const dataType = (...required) => {
    return async (next, socket, io, payload) => {
        try {
            if (!socket.user) {
                return `socket user not found`;
            }
            if (typeof payload !== 'object') {
                return next(
                    `socket action payload must be type object, received ${typeof payload} `
                );
            }
            for (let i = 0; i < required.length; i++) {
                const key = required[i];
                if (!payload[key]) throw `property ${key} required`;
            }
            next();
        } catch (error) {
            next(new IoError(error));
        }
    };
};

export default dataType;
