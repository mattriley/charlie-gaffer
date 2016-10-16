const systemConfig = require('system/system-config');
const MessageRepository = require('./lib/message-repository');

module.exports = {
    createMessageRepository: params => {
        return new MessageRepository({
            tableName: `${systemConfig.systemNamespace}--messages`,
            dynamoClient: params.dynamoClient
        });
    }
};