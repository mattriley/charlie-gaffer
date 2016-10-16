const systemConfig = require('../../system-config');

const bucketName = `${systemConfig.systemNameSimplified}-code`;

module.exports = {
    "Type": "AWS::S3::Bucket",
    "Properties": {
        "BucketName": bucketName,
    }
};