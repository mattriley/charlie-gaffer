const _ = require('lodash');
const AWS = require('aws-sdk');
const MessageRepository = require('./message-repository');
const NotificationService = require('./notification-service');
const GrecaptchaVerificationService = require('./grecaptcha-verification-service');

const messageRepository = new MessageRepository({
    tableName: process.env.MESSAGES_TABLE_NAME,
    dynamoClient: new AWS.DynamoDB.DocumentClient()
});

const notificationService = new NotificationService({
    sesClient: new AWS.SES({ region: process.env.AWS_SES_REGION }),
    fromAddress: process.env.NOTIFICATION_FROM_ADDRESS,
    toAddress: process.env.NOTIFICATION_TO_ADDRESS
});

const grecaptchaVerificationService = new GrecaptchaVerificationService({
    secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY
});

module.exports.send = (event, context, callback) => {

    const sendStatus = (statusCode) => {
        const response = {
            statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            }
        };
        callback(null, response);
    };

    const body = JSON.parse(event.body);

    return grecaptchaVerificationService.verify({
        response: body.grecaptchaResponse
    }).then(verificationResult => {
        if (!verificationResult.success) {
            return sendStatus(500);
        }
        const message = _.pick(body, ['name', 'email', 'phone', 'message']);
        if (message.phone === '') delete message.phone; // Dynamo doesn't accept empty string
        return messageRepository.insertMessage(message).then(() => {
            notificationService.send(message);
            sendStatus(201);
        });
    }).catch(err => {
        console.log(err.stack);
        sendStatus(500);
    });
};
