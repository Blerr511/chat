const { Error } = require("mongoose");

module.exports = (req, error) => {
    if (error instanceof Error.ValidationError) {
        const errors = error.errors;
        const firstError = errors[Object.keys(errors)[0]];
        return (req.response = {
            status: "error",
            message: firstError?.message,
            code: 400,
        });
    }
    req.response = {
        status: "error",
        message: error?.message ?? error,
        code: 400
    };
};
