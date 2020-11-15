const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3();

const bucket = process.env.AWS_BUCKET_NAME;

const configureAwsS3 = () => {
  s3.createBucket({ Bucket: bucket }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(`AWS S3 bucket ${bucket.blue} success started`);
    }
  });
};
const storage = multerS3({
  s3,
  bucket,
  metadata: function (req, file, cb) {
    console.log(file);
    cb(null, { fieldName: file.fieldname });
  },
  acl: "public-read",
  key: function (req, file, cb) {
    req.fileKey = Date.now().toString() + file.originalname;
    cb(null, req.fileKey);
  },
});
const upload = multer({ storage });
const deleteFile = (Key) => {
  s3.deleteObject({ Bucket: bucket, Key }, (err, data) => {
    if (err) console.warn("failed to delete aws s3 file - ", err);
  });
};

module.exports = {
  upload,
  configureAwsS3,
  deleteFile,
};
