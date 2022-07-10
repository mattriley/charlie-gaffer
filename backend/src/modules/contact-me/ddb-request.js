const _ = require('lodash');
const recordAttrs = ['name', 'email', 'phone', 'message'];

module.exports = ({ io, config }) => ({ message, isTest }) => {

    const tableName = `${config.messagesTableName}-${isTest ? 'test' : 'prod'}`;
    const id = io.uuid();
    const createdOn = new Date(io.now()).toISOString();
    const item = _.chain(message).pick(recordAttrs).omitBy(v => !v).assign({ id, createdOn }).value();
    return { TableName: tableName, Item: item };

};
