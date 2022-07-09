const _ = require('lodash');
const recordAttrs = ['name', 'email', 'phone', 'message'];

module.exports = ({ io, config }) => message => {

    const tableName = config.messagesTableName;
    const id = io.uuid();
    const createdOn = new Date(io.now()).toISOString();
    const item = _.chain(message).pick(recordAttrs).omitBy(v => !v).assign({ id, createdOn }).value();
    const params = { TableName: tableName, Item: item };
    return io.dynamoClient.putAsync(params).promise();

};
