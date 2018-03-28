module.exports = ({ toAddress, fromAddress, sesClient }) => {
    return message => {
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

        return sesClient.sendEmail(sendEmailParams).promise();
    };
};
