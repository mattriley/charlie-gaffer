const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const crypto = require('crypto');

module.exports = ({ config }) => () => {

    return {
        fetch,
        uuid: crypto.randomUUID,
        now: Date.now,
        dynamoClient: new AWS.DynamoDB.DocumentClient(),
        sesClient: new AWS.SES({ region: config.awsSesRegion }),
    };

};
