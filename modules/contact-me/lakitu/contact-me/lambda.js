module.exports = {
    "Type": "AWS::Lambda::Function",
    "Properties": {
        "Role": "arn:aws:iam::354947436087:role/lambda_basic_execution",
        "Runtime": "nodejs4.3",
        "Timeout": "30",
        "FunctionName": "contact-me",
        "Handler": "index.handler",
        "Code": {
            "S3Bucket": { "Ref": "CodeS3Bucket" },
            "S3Key": { "Ref": "CodeS3Key" }
        }
    }
};