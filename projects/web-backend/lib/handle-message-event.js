const _ = require('lodash');
const Promise = require('bluebird');

const whitelist = ['name', 'email', 'phone', 'message'];
const deleteBlanks = o => Object.keys(o).forEach(k => !o[k] && delete o[k]);

module.exports = (event, context, callback) => {
    const { console, saveMessage, sendEmail, verifyGrecaptcha } = this;

    const sendStatus = (statusCode) => {
        const response = {
            statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            }
        };
        callback(null, response);
    };

    const checkCaptchaResult = body => {
        return verifyGrecaptcha({ response: body.grecaptchaResponse })
            .then(result => {
                if (result.success) return;
                throw new Error('Captcha verification failed.');
            });
    };

    return Promise.resolve(event.body)
        .then(JSON.parse)
        .tap(checkCaptchaResult)
        .then(body => _.pick(body, whitelist))
        .then(deleteBlanks)
        .then(saveMessage)
        .tap(sendEmail)
        .then(() => sendStatus(201))
        .catch(callback);
};
