const test = require('tape');
const td = require('testdouble');
const _verifyCaptcha = require('../lib/verify-captcha');

test('verify captcha', t => {
    const fetchResponse = { json: td.function() };
    td.when(fetchResponse.json()).thenResolve('FETCH_RESPONSE_DATA');

    const fetch = td.function();
    td.when(fetch(
        'https://www.google.com/recaptcha/api/siteverify?secret=SECRET&response=RESPONSE',
        { method: 'POST' }
    )).thenResolve(fetchResponse);

    const verifyCaptcha = _verifyCaptcha.bind({ secret: 'SECRET', fetch });

    verifyCaptcha({ response: 'RESPONSE' }).then(result => {
        t.equal(result, 'FETCH_RESPONSE_DATA', 'captcha would have been verified');
        t.end();
    });
});