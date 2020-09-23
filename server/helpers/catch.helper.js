const { Error } = require("mongoose");
const { deleteFile } = require("./multer.helper");
module.exports = (req, error, rest) => {
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
        code: 400,
        ...rest,
    };
    if (req.fileKey) deleteFile(req.fileKey);
};
