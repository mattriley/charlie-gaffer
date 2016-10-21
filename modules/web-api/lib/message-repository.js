'use strict';

const Promise = require('bluebird');
const uuid = require('node-uuid');

class MessageRepository {

    constructor(params) {
        this._tableName = params.tableName;
        this._dynamoClient = Promise.promisifyAll(params.dynamoClient);
    }

    insertMessage(message) {
        message.id = uuid.v4();
        var params = {
            Item: message,
            TableName: this._tableName
        };
        return this._dynamoClient.putAsync(params);
    }

}

module.exports = MessageRepository;