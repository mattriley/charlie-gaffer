const test = require('tape');
const td = require('testdouble');
const composeContactMe = require('../lib/contact-me');

test('contact me happy path', t => {

    const fetchResponse = { json: td.function() };
    td.when(fetchResponse.json()).thenResolve({ success: true });

    const fetch = td.function();
    td.when(fetch(
        'https://www.google.com/recaptcha/api/siteverify?secret=RECAPTCHA_SECRET_KEY&response=RECAPTCHA_RESPONSE',
        { method: 'POST' }
    )).thenResolve(fetchResponse);


    const config = {
        messagesTableName: 'MESSAGES_TABLE_NAME',
        notificationFromAddress: 'NOTIFICATION_FROM_EMAIL',
        notificationToAddress: 'NOTIFICATION_TO_EMAIL',
        captchaSecretKey: 'RECAPTCHA_SECRET_KEY'
    };


    const uuid = td.function();
    td.when(uuid()).thenReturn('ID');

    const now = td.function();
    td.when(now()).thenReturn(Date.parse('2018-01-11'));

    const item = {
        id: 'ID',
        createdOn: '2018-01-11T00:00:00.000Z',
        name: 'NAME',
        email: 'EMAIL',
        phone: 'PHONE',
        message: 'MESSAGE'
    };


    const sendEmailParams = {
        Destination: {
            ToAddresses: ['NOTIFICATION_TO_EMAIL']
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
        Source: 'NOTIFICATION_FROM_EMAIL'
    };


    const dynamoClient = { put: td.function() };
    const putParams = { Item: item, TableName: 'MESSAGES_TABLE_NAME' };
    td.when(dynamoClient.put(putParams)).thenCallback(null);

    const sendEmailResult = { promise: td.function() };
    td.when(sendEmailResult.promise()).thenResolve();

    const sesClient = { sendEmail: td.function() };
    td.when(sesClient.sendEmail(sendEmailParams)).thenReturn(sendEmailResult);

    const contactMe = composeContactMe({
        dynamoClient,
        sesClient,
        uuid,
        now,
        config
    });

    const event = {
        body: JSON.stringify({
            grecaptchaResponse: 'RECAPTCHA_RESPONSE',
            name: 'NAME',
            email: 'EMAIL',
            phone: 'PHONE',
            message: 'MESSAGE'
        })
    };

    const context = {};
    const callback = (err, res) => {
        t.end();
    };

    contactMe(event, context, callback);
});
