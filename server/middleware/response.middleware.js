const { response } = require("express");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports = (req, res) => {
    const { code, status, message, data } = req.response;
    res.status(code).send({ status, message, data });
};
