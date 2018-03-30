const _ = require('lodash');
const _saveMessage = require('./save-message');
const _sendEmail = require('./send-email');
const _verifyCaptcha = require('./verify-captcha');
const _lambda = require('./lambda');

module.exports = ({ dynamoClient, sesClient, fetch, uuid, now, config }) => {
    return _lambda({
        console,
        saveMessage: _saveMessage({
            now,
            uuid,
            tableName: config.messagesTableName,
            dynamoClient
        }),
        sendEmail: _sendEmail({
            fromAddress: config.notificationFromAddress,
            toAddress: config.notificationToAddress,
            sesClient
        }),
        verifyCaptcha: config.captchaEnabled ? _verifyCaptcha({
            secret: config.recaptchaSecretKey,
            fetch
        }) : _.noop()
    });
};