const Promise = require('bluebird');

module.exports = function (message) {
    const { toAddress, fromAddress, sesClient } = this;

    const lines = [
        `Name: ${message.name}`,
        `Email: ${message.email}`,
        `Phone: ${message.phone}`,
        `Message: ${message.message}`
    ];

    const sendEmailParams = {
        Destination: {
            ToAddresses: [toAddress]
        },
        Message: {
            Body: {
                Html: {
                    Data: lines.join('<br/>'),
                },
                Text: {
                    Data: lines.join("\n"),
                }
            },
            Subject: {
                Data: `${message.name} sent you a message`
            }
        },
        Source: fromAddress
    }

    const sendEmail = Promise.promisify(sesClient.sendEmail);
    return sendEmail(sendEmailParams);
};
