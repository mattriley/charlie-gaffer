'use strict';

const uuid = require('node-uuid');
const Promise = require('bluebird');

class MessageRepository {

    constructor(params) {
        this._tableName = params.tableName;
        this._dynamoClient = Promise.promisifyAll(params.dynamoClient);
    }

    insertMessage(message) {
        var params = {
            Item: Object.assign({id: uuid.v4()}, message),
            TableName: this._tableName
        };
        return this._dynamoClient.putAsync(params);
    }

}

module.exports = MessageRepository;