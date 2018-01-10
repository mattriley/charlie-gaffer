const Promise = require('bluebird');

module.exports = function (message) {
    const { now, uuid, tableName, dynamoClient } = this;

    const params = {
        TableName: tableName,
        Item: Object.assign({}, message, {
            id: uuid(),
            createdOn: new Date(now()).toISOString()
        })        
    };

    return Promise.promisify(dynamoClient.put)(params);
};