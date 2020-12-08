const S3Error = require('./S3.error');

module.exports = class OperationFailedError extends S3Error {};
