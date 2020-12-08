const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const Service = require('../../../helpers/utils/Service');
const OperationFailedError = require('../../../errors/Aws/s3/OperationFailed.error');
const s3 = new AWS.S3();

const bucket = process.env.AWS_BUCKET_NAME;
const S3Service = new (class AwsS3Controller extends Service {
    static BUCKET = process.env.AWS_BUCKET_NAME;
    s3 = new AWS.S3();
    storage = null;
    upload = null;
    constructor() {
        super();
        const { s3 } = this;
        const bucket = AwsS3Controller.BUCKET;
        const storage = multerS3({
            s3,
            bucket,
            metadata: function (req, file, cb) {
                console.log(file);
                cb(null, { fieldName: file.fieldname });
            },
            acl: 'public-read',
            key: function (req, file, cb) {
                req.fileKey = Date.now().toString() + file.originalname;
                cb(null, req.fileKey);
            },
        });
        this.storage = storage;
        this.upload = multer({ storage });
    }
    start() {
        return this.configure();
    }
    configure() {
        return new Promise((res, rej) => {
            s3.createBucket({ Bucket: bucket }, function (err, data) {
                if (err) {
                    rej(err);
                    console.log(err);
                } else {
                    res(bucket);
                    console.log(`AWS S3 bucket ${bucket.blue} success started`);
                }
            });
        });
    }
    deleteFile(Key) {
        const bucket = AwsS3Controller.BUCKET;
        return new Promise((res, rej) => {
            this.s3.deleteObject({ Bucket: bucket, Key }, (err, data) => {
                if (err) {
                    rej(
                        new OperationFailedError(
                            `failed to delete aws s3 file - ${err}`
                        )
                    );
                } else {
                    res(data);
                }
            });
        });
    }
})();

module.exports = S3Service;
