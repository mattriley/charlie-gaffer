const Promise = require('bluebird');

module.exports = function (event, context, callback) {
    const { verifyCaptcha, saveMessage, sendEmail } = this;

    const sendResponse = () => {
        const response = {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        };
        callback(null, response);
    };

    return Promise.resolve(event.body)
        .then(JSON.parse)
        .tap(message => verifyCaptcha({ response: message.grecaptchaResponse }))
        .tap(saveMessage)
        .tap(sendEmail)
        .tap(sendResponse)
        .catch(callback);
};
