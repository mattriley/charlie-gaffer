const AWS = require('aws-sdk');
const uuid = require('node-uuid').v4;
const fetch = require('node-fetch');

module.exports = ({ config }) => () => {

    return {
        fetch,
        uuid,
        now: Date.now,
        dynamoClient: new AWS.DynamoDB.DocumentClient(),
        sesClient: new AWS.SES({ region: config.awsSesRegion }),
    };

};
