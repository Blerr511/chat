/**
 *
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */
module.exports = (req, res) => {
    const { code, status, message, data } = req.response;
    res.status(code).send({ status, message, data });
};
