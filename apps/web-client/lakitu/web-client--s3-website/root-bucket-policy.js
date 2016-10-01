module.exports = {
    "Type": "AWS::S3::BucketPolicy",
    "Properties": {
        "Bucket": {"Ref": "RootBucket"},
        "PolicyDocument": {
            "Statement": [{
                "Sid": "Allow Public Access to All Objects",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": {"Fn::Join": ["", ["arn:aws:s3:::", {"Ref": "RootBucket"}, "/*"]]}
            }]
        }
    }
};