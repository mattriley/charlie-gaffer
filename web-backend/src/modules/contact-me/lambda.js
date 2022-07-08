const Promise = require('bluebird');

module.exports = ({ contactMe }) => (event, context, callback) => {

    const { verifyCaptcha, saveMessage, sendEmail } = contactMe;

    const sendResponse = () => {
        const response = {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        callback(null, response);
    };

    return Promise.resolve(event.body)
        .then(JSON.parse)
        .tap(message => verifyCaptcha(message.grecaptchaResponse))
        .tap(saveMessage)
        .tap(sendEmail)
        .tap(sendResponse)
        .catch(callback);
};
