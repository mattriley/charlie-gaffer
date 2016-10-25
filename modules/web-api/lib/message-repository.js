'use strict';

const uuid = require('node-uuid');
const Promise = require('bluebird');

class MessageRepository {

    constructor(params) {
        this._tableName = params.tableName;
        this._dynamoClient = Promise.promisifyAll(params.dynamoClient);
    }

    insertMessage(message) {
        const meta = {
            id: uuid.v4(),
            createdOn: new Date().toISOString()
        };
        const params = {
            Item: Object.assign({}, meta, message),
            TableName: this._tableName
        };
        console.log('INSERT', JSON.stringify(params, null, 2));
        return this._dynamoClient.putAsync(params);
    }

}

module.exports = MessageRepository;