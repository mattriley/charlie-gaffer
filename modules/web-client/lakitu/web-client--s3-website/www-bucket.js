module.exports = {
    "Type": "AWS::S3::Bucket",
    "Properties": {
        "BucketName": {"Fn::Join": ["", ["www.", {"Ref": "DomainName"}]]},
        "WebsiteConfiguration": {
            "RedirectAllRequestsTo": {
                "HostName": {"Fn::Join": [".", [{"Ref": "RootBucket"}, {"Fn::FindInMap": ["RegionMap", {"Ref": "AWS::Region"}, "websiteendpoint"]}]]}
            }
        }
    }
};