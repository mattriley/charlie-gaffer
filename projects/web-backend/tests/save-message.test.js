const test = require('tape');
const td = require('testdouble');
const _saveMessage = require('../lib/save-message');

test('save message', t => {
    const uuid = { v4: td.function() };
    td.when(uuid.v4()).thenReturn('ID');

    const getISODateString = td.function();
    td.when(getISODateString()).thenReturn('DATE');

    const item = {
        id: 'ID',
        createdOn: 'DATE',
        foo: 'BAR'
    };

    const tableName = 'TABLE_NAME';

    const dynamoClient = { put: td.function() };
    const putParams = { Item: item, TableName: tableName };
    td.when(dynamoClient.put(putParams)).thenCallback(null, null);

    const saveMessage = _saveMessage.bind({
        tableName,
        uuid,
        getISODateString,
        dynamoClient
    });

    saveMessage({ foo: 'BAR' }).then(() => {
        t.pass('message would have been saved');
        t.end();
    });
});