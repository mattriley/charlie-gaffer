module.exports = ({ io, config }) => message => {

    const { sesClient } = io;
    const fromAddress = config.notificationFromAddress;
    const toAddress = config.notificationToAddress;

    // console.log({ io, config })

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
                    Data: lines.join('\n'),
                }
            },
            Subject: {
                Data: `${message.name} sent you a message`
            }
        },
        Source: fromAddress
    };

    console.log(sesClient)

    return sesClient.sendEmail(sendEmailParams).promise();
};
