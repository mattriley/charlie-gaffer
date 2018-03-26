const test = require('tape');
const td = require('testdouble');
const _sendEmail = require('../lib/send-email');

test('send email', t => {

    const toAddress = 'TO_ADDRESS';
    const fromAddress = 'FROM_ADDRESS';

    const message = {
        name: 'NAME',
        email: 'EMAIL',
        phone: 'PHONE',
        message: 'MESSAGE'
    };

    const sendEmailParams = {
        Destination: {
            ToAddresses: [toAddress]
        },
        Message: {
            Body: {
                Html: {
                    Data: 'Name: NAME<br/>Email: EMAIL<br/>Phone: PHONE<br/>Message: MESSAGE'
                },
                Text: {
                    Data: 'Name: NAME\nEmail: EMAIL\nPhone: PHONE\nMessage: MESSAGE'
                }
            },
            Subject: {
                Data: 'NAME sent you a message'
            }
        },
        Source: fromAddress
    };

    const sendEmailResult = { promise: td.function() };
    td.when(sendEmailResult.promise()).thenResolve();

    const sesClient = { sendEmail: td.function() };
    td.when(sesClient.sendEmail(sendEmailParams)).thenReturn(sendEmailResult);

    const sendEmail = _sendEmail({ toAddress, fromAddress, sesClient });

    sendEmail(message).then(() => {
        t.pass('email would have been sent');
        t.end();
    });
});