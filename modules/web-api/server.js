'use strict';

const AWS = require('aws-sdk');
const AppFactory = require('./lib/app-factory');
const systemConfig = require('system/system-config');
const MessageRepository = require('./lib/message-repository');
const PostMessageHandler = require('./lib/post-message-handler');
const NotificationService = require('./lib/notification-service');
const GrecaptchaVerificationService = require('./lib/grecaptcha-verification-service');

const env = process.env;

const appFactory = new AppFactory({
    postMessageHandler: new PostMessageHandler({
        messageRepository: new MessageRepository({
            tableName: `${systemConfig.systemNamespace}--messages`,
            dynamoClient: new AWS.DynamoDB.DocumentClient()
        }),
        notificationService: new NotificationService({
            sesClient: new AWS.SES({region: env.AWS_REGION_SES}),
            fromAddress: env.NOTIFICATION_FROM_ADDRESS,
            toAddress: env.NOTIFICATION_TO_ADDRESS
        }),
        grecaptchaVerificationService: new GrecaptchaVerificationService({
            secret: env.GRECAPTCHA_SECRET
        })
    })
});

const port = env.PORT;
console.log('Port is ' + port);
const app = appFactory.createApp();
app.listen(port);