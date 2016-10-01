'use strict';

const lakitu = require('lakitu');
const s3HostedZonesRegionMap = require('lakitu/mappings/s3-hosted-zones-region-map.json');

const systemConfig = require('system/system-config');
const appConfig = require('./app-config');

module.exports = {
    namespace: `${systemConfig.systemNameSimplified}--${systemConfig.systemEnv}`,
    region: 'ap-southeast-2',
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/web-client--s3-website',
            template: {
                Mappings: {RegionMap: s3HostedZonesRegionMap},
                Parameters: {
                    "DomainName": {
                        "Type": "String",
                        "Default": appConfig.appDomain
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
                        "Default": appConfig.hostedZone
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