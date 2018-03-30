const test = require('tape');
const lambdaFunctions = require('../../lib');

test('handle message event', t => {
    t.assert(lambdaFunctions.contactMe);
    t.end();
});