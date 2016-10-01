module.exports = {
    "Type": "AWS::Route53::RecordSet",
    "Properties": {
        "HostedZoneName": {"Ref": "HostedZoneName"},
        "Name": {"Fn::Join": ["", [{"Ref": "DomainName"}, "."]]},
        "Type": "A",
        "AliasTarget": {
            "HostedZoneId" : "Z2FDTNDATAQYW2",
            "DNSName": {"Ref": "CloudfrontDistributionDomainName"}
        }
    }
};
