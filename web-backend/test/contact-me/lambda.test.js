const test = require('tape');
const td = require('testdouble');
const _handleMessageEvent = require('../../lib/contact-me/lambda');

test('handle message event', t => {

    const message = { grecaptchaResponse: 'CAPTCHA_RESPONSE' };

    const event = {
        body: JSON.stringify(message)
    };

    const context = {};

    const verifyCaptcha = td.function();
    const saveMessage = td.function();
    const sendEmail = td.function();

    const handleMessageEvent = _handleMessageEvent({
        verifyCaptcha,
        saveMessage,
        sendEmail
    });

    const callback = (err, res) => {
        td.verify(verifyCaptcha(message.grecaptchaResponse));
        td.verify(saveMessage(message));
        td.verify(sendEmail(message));
        t.end();
    };

    handleMessageEvent(event, context, callback);
});