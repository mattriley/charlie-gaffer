module.exports = ({ config }) => message => {

    const fromAddress = config.notificationFromAddress;
    const toAddress = config.notificationToAddress;

    const lines = [
        `Name: ${message.name}`,
        `Email: ${message.email}`,
        `Phone: ${message.phone}`,
        `Message: ${message.message}`
    ];

    return {
        Destination: {
            ToAddresses: [toAddress]
        },
        Message: {
            Body: {
                Html: {
                    Data: lines.join('<br/>'),
                },
                Text: {
                    Data: lines.join('\n'),
                }
            },
            Subject: {
                Data: `${message.name} sent you a message`
            }
        },
        Source: fromAddress
    };

};
