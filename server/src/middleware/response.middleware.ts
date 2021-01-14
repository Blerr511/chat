/**
 *
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */
const responseMiddleware = (req, res) => {
    const { code, status, message, data } = req.response;
    res.status(code).send({ status, message, data });
};

export default responseMiddleware;
