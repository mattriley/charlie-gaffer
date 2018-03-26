const test = require('tape');
const td = require('testdouble');
const _verifyCaptcha = require('../lib/verify-captcha');

test('successfully verify captcha', t => {
    const fetchResponse = { json: td.function() };
    td.when(fetchResponse.json()).thenResolve({ success: true });

    const fetch = td.function();
    td.when(fetch(
        'https://www.google.com/recaptcha/api/siteverify?secret=SECRET&response=RESPONSE',
        { method: 'POST' }
    )).thenResolve(fetchResponse);

    const verifyCaptcha = _verifyCaptcha({ secret: 'SECRET', fetch, enabled: true });

    verifyCaptcha({ response: 'RESPONSE' }).then(() => {
        t.pass('Captcha verification would have succeeded');
        t.end();
    });
});

test('failure to verify captcha', t => {
    const fetchResponse = { json: td.function() };
    td.when(fetchResponse.json()).thenResolve({ success: false });

    const fetch = td.function();
    td.when(fetch(
        'https://www.google.com/recaptcha/api/siteverify?secret=SECRET&response=RESPONSE',
        { method: 'POST' }
    )).thenResolve(fetchResponse);

    const verifyCaptcha = _verifyCaptcha({ secret: 'SECRET', fetch, enabled: true });

    verifyCaptcha({ response: 'RESPONSE' }).catch(err => {
        t.equal(err.message, 'Captcha verification failed.');
        t.pass('Captcha verification would have failed');
        t.end();
    });
});