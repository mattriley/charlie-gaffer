'use strict';

const Promise = require('bluebird');

class NotificationService {

    constructor(params) {
        this._sesClient = Promise.promisifyAll(params.sesClient);
        this._toAddress = params.toAddress;
        this._fromAddress = params.fromAddress;
    }

    send(params) {
        const lines = this._getMessageLines(params);
        return this._sesClient.sendEmailAsync({
            Destination: {
                ToAddresses: [this._toAddress]
            },
            Message: {
                Body: {
                    Html: {
                        Data: lines.join('<br/>'),
                    },
                    Text: {
                        Data: lines.join("\n"),
                    }
                },
                Subject: {
                    Data: `${params.name} sent you a message`
                }
            },
            Source: this._fromAddress
        });
    }

    _getMessageLines(params) {
        return [
            `Name: ${params.name}`,
            `Email: ${params.email}`,
            `Phone: ${params.phone}`,
            `Message: ${params.body}`
        ];
    }

}

module.exports = NotificationService;