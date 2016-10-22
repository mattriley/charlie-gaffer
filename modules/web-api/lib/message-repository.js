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
            createdOn: Date.now().toUTCString()
        };
        return this._dynamoClient.putAsync({
            Item: Object.assign({}, meta, message),
            TableName: this._tableName
        });
    }

}

module.exports = MessageRepository;