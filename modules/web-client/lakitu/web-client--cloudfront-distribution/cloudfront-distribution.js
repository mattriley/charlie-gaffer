module.exports = {
    "Type": "AWS::CloudFront::Distribution",
    "Properties": {
        "DistributionConfig": {
            "Comment": "Point to a S3 Static Site.",
            "Enabled": "true",
            "DefaultRootObject": "index.html",
            "Logging": {
                "Bucket": {"Ref": "LogBucketDomainName"},
                "Prefix": "cdn/"
            },
            "Origins": [
                {
                    "DomainName": {"Ref": "RootBucketDomainName"},
                    "Id": "S3Origin",
                    "CustomOriginConfig": {
                        "HTTPPort": "80",
                        "HTTPSPort": "443",
                        "OriginProtocolPolicy": "match-viewer"
                    }
                }
            ],
            "Aliases": [
                {"Ref": "DomainName"},
                {"Fn::Join": ["", ["www.", {"Ref": "DomainName"}]]}
            ],
            "DefaultCacheBehavior": {
                "Compress": "true",
                "DefaultTTL": "86400",
                "TargetOriginId": "S3Origin",
                "ViewerProtocolPolicy": "allow-all",
                "ForwardedValues": {
                    "QueryString": "true"
                }
            }
        }
    }
};