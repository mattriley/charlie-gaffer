const _ = require('lodash');
const Promise = require('bluebird');
const recordAttrs = ['name', 'email', 'phone', 'message'];

module.exports = function (message) {
    const { now, uuid, tableName, dynamoClient } = this;

    const id = uuid();
    const createdOn = new Date(now()).toISOString();
    const item = _.chain(message).pick(recordAttrs).omitBy(v => !v).assign({ id, createdOn }).value();
    const params = { TableName: tableName, Item: item };
    
    Promise.promisifyAll(dynamoClient);
    return dynamoClient.putAsync(params);
};