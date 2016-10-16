module.exports = {
    "Type": "AWS::S3::Bucket",
    "Properties": {
        "BucketName": {"Ref": "DomainName"},
        "WebsiteConfiguration": {
            "IndexDocument": "index.html",
            "ErrorDocument": "error.html"
        },
        "LoggingConfiguration": {
            "DestinationBucketName": {"Ref": "LogBucket"},
            "LogFilePrefix": "root/"
        }
    }
};