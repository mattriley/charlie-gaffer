const test = require('tape');
const td = require('testdouble');
const composeContactMe = require('../../lib/contact-me');

test('composes the contact me lambda function', t => {
    const contactMe = composeContactMe({
        dynamoClient: {},
        sesClient: {},
        uuid: td.function(),
        now: td.function(),
        config: {
            captchaEnabled: true,
        }
    });

    t.assert(contactMe);
    t.end();
});

test('composes the contact me lambda function with captcha disabled', t => {
    const contactMe = composeContactMe({
        dynamoClient: {},
        sesClient: {},
        uuid: td.function(),
        now: td.function(),
        config: {
            captchaEnabled: false,
        }
    });

    t.assert(contactMe);
    t.end();
});