const test = require('tape');
const td = require('testdouble');

const compose = require('../src/compose');

// TODO: Test empty and extra fields.

test('save message', async t => {

    const config = {
        messagesTableName: 'TABLE_NAME'
    };


    const uuid = td.function();
    td.when(uuid()).thenReturn('ID');

    const now = td.function();
    td.when(now()).thenReturn(Date.parse('2018-01-11'));

    const dynamoClient = { put: td.function() };

    const overrides = {
        io: { uuid, now, dynamoClient }
    };

    const { modules } = compose({ configs: [config], overrides });



    const item = {
        id: 'ID',
        createdOn: '2018-01-11T00:00:00.000Z',
        name: 'NAME',
        email: 'EMAIL',
        phone: 'PHONE',
        message: 'MESSAGE1'
    };

    const putParams = { Item: item, TableName: config.messagesTableName };
    td.when(dynamoClient.put(putParams)).thenCallback(null);

    const message = {
        name: 'NAME',
        email: 'EMAIL',
        phone: 'PHONE',
        message: 'MESSAGE'
    };

    await modules.contactMe.saveMessage(message);
    t.pass('message would have been saved');
    t.end();
});
