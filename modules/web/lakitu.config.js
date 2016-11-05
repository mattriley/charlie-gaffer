'use strict';

const lakitu = require('lakitu');
const s3HostedZonesRegionMap = require('lakitu/mappings/s3-hosted-zones-region-map.json');

const systemConfig = require('system/system-config');
const moduleConfig = require('./module-config');

module.exports = {
    config: Object.assign({}, systemConfig, moduleConfig),
    namespace: process.env.SYSTEM_NAMESPACE,
    region: process.env.AWS_REGION,
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/web--s3-website',
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
            namespaceExcludes: ['RootBucket.BucketName', 'WwwBucket.BucketName']
        },
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/web--cloudfront-distribution',
            template: {
                Parameters: {
                    "DomainName": {
                        "Type": "String",
                    },
                    "RootBucketDomainName": {
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
            templateDir: 'lakitu/web--cloudfront-dns',
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