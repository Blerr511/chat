import { RequestHandler } from 'express';
import { JWTDecodedData } from 'interfaces/jwtData.interface';
import { verify } from 'jsonwebtoken';

const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        } else {
            throw new Error('Auth Token not found');
        }
        verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded: JWTDecodedData) => {
                if (err) throw err;
                if (decoded.exp < Date.now() / 1000)
                    throw new Error('Token is out of date');
                delete decoded.iat;
                delete decoded.exp;
                req.user = decoded;
            }
        );
        req.response = {
            code: 200,
        };
        next();
    } catch (error) {
        res.status(404).send({
            status: 'error',
            message: error.message ?? error,
        });
    }
};

export default authMiddleware;
