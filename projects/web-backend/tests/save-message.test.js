const test = require('tape');
const td = require('testdouble');
const _saveMessage = require('../lib/save-message');

// TODO: Test empty and extra fields.

test('save message', t => {
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

    const tableName = 'TABLE_NAME';

    const dynamoClient = { put: td.function() };
    const putParams = { Item: item, TableName: tableName };
    td.when(dynamoClient.put(putParams)).thenCallback(null);

    const saveMessage = _saveMessage.bind({
        now,
        uuid,
        tableName,
        dynamoClient
    });

    const message = {
        name: 'NAME',
        email: 'EMAIL',
        phone: 'PHONE',
        message: 'MESSAGE'
    };

    saveMessage(message).then(() => {
        t.pass('message would have been saved');
        t.end();
    });
});