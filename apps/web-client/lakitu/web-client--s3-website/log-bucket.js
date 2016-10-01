module.exports = {
    "Type": "AWS::S3::Bucket",
    "DeletionPolicy": "Delete",
    "Properties": {
        "BucketName": {"Fn::Join": ["", ["logs.", {"Ref": "DomainName"}]]},
        "AccessControl": "LogDeliveryWrite",
        "LifecycleConfiguration": {
            "Rules": [
                {
                    "Status": "Enabled",
                    "ExpirationInDays": 30
                }
            ]
        }
    }
};