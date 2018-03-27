const Promise = require('bluebird');

module.exports = ({ verifyCaptcha, saveMessage, sendEmail }) => {
    return (event, context, callback) => {

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
            .tap(message => verifyCaptcha(message.grecaptchaResponse))
            .tap(saveMessage)
            .tap(sendEmail)
            .tap(sendResponse)
            .catch(callback);
    };
};
