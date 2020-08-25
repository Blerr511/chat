module.exports = (req, error) => {
    req.response = {
        status: "error",
        message: error?.message ?? error,
        code: 400,
    };
};
