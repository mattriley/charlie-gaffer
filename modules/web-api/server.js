'use strict';

const AWS = require('aws-sdk');
const MessageRepository = require('./lib/message-repository');
const GrecaptchaVerificationService = require('./lib/grecaptcha-verification-service');
const systemConfig = require('system/system-config');

const app = require('./lib/create-app')({
    messageRepository: new MessageRepository({
        tableName: `${systemConfig.systemNamespace}--messages`,
        dynamoClient: new AWS.DynamoDB.DocumentClient()
    }),
    grecaptchaVerificationService: new GrecaptchaVerificationService({
        secret: process.env.GRECAPTCHA_SECRET
    })
});

var port = process.env.PORT;
console.log('Port is ' + port);
app.listen(port);