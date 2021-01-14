import { sign, verify } from 'jsonwebtoken';

import Server from 'db/models/server';
import Token from 'db/models/token';

import { JWTDecodedData } from 'interfaces/jwtData.interface';

const uniqid = require('uniqid');
/**
 * @type {import("express").RequestHandler}
 */
const generate = async (req, res, next) => {
    try {
        const {
            body: { serverId, expiresIn, useCount },
            user,
        } = req;
        const server = await Server.findById(serverId).select('name icon');
        if (!server) throw new Error('Incorrect server Id ');
        const token = sign(
            { server, createdAt: Date.now(), createdBy: user },
            process.env.JWT_SECRET,
            expiresIn ? { expiresIn: expiresIn * 1000 } : {}
        );
        const key = uniqid.time();
        const dbToken = new Token({
            key,
            value: token,
            expiresIn,
            useCount,
            sender: user._id,
        });
        await dbToken.save();
        req.response = {
            code: 200,
            status: 'success',
            message: 'Token success generated',
            data: key,
        };
        next();
    } catch (error) {
        next(error);
    }
};
/**
 * @type {import("express").RequestHandler}
 */
const check = async (req, res, next) => {
    try {
        const {
            query: { invite },
        } = req;
        const _token = await Token.findOne({ key: invite }).populate('user');
        if (!_token) throw new Error('Invite is not valid');
        const token = _token.value;
        verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded: JWTDecodedData) => {
                if (err) throw err;
                if (decoded.exp < Date.now() / 1000)
                    throw new Error('Token is out of date');
                req.response = {
                    code: 200,
                    status: 'success',
                    message: 'Token is valid',
                    data: decoded,
                };
                next();
            }
        );
    } catch (error) {
        next(error);
    }
};

const tokenController = {
    check,
    generate,
};

export default tokenController;
