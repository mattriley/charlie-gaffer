'use strict';

const Promise = require('bluebird');

class MessageRepository {

    constructor(params) {
        this._tableName = params.tableName;
        this._dynamoClient = Promise.promisifyAll(params.dynamoClient);
    }

}

module.exports = MessageRepository;