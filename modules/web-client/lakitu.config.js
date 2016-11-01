'use strict';

const lakitu = require('lakitu');
const s3HostedZonesRegionMap = require('lakitu/mappings/s3-hosted-zones-region-map.json');

const moduleConfig = require('./module-config');

module.exports = {
    namespace: process.env.SYSTEM_NAMESPACE,
    region: process.env.AWS_REGION,
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/web-client--s3-website',
            template: {
                Mappings: {RegionMap: s3HostedZonesRegionMap},
                Parameters: {
                    "DomainName": {
                        "Type": "String",
                        "Default": moduleConfig.appDomain
                    }
                },
                Outputs: {
                    "DomainName": {
                        "Value": {"Ref": "DomainName"}
                    }
                }
            },
            namespaceExcludes: ['RootBucket.BucketName', 'WwwBucket.BucketName', 'LogBucket.BucketName']
        },
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/web-client--cloudfront-distribution',
            template: {
                Parameters: {
                    "DomainName": {
                        "Type": "String",
                    },
                    "RootBucketDomainName": {
                        "Type": "String"
                    },
                    "LogBucketDomainName": {
                        "Type": "String"
                    }
                },
                Outputs: {
                    "CloudfrontDistributionDomainName": {
                        "Value": {"Fn::GetAtt": ["CloudfrontDistribution", "DomainName"]}
                    }
                }
            }
        },
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/web-client--cloudfront-dns',
            template: {
                Parameters: {
                    "HostedZoneName": {
                        "Type": "String",
                        "Default": moduleConfig.hostedZone
                    },
                    "DomainName": {
                        "Type": "String",
                    },
                    "CloudfrontDistributionDomainName": {
                        "Type": "String"
                    }
                }
            }
        }
    ]
};