'use strict';

const _ = require('lodash');

class PostMessageHandler {

    constructor(params) {
        this._grecaptchaVerificationService = params.grecaptchaVerificationService;
        this._messageRepository = params.messageRepository;
        this._notificationService = params.notificationService;
    }

    handle(req, res) {
        return this._grecaptchaVerificationService.verify({
            response: req.body.grecaptchaResponse
        }).then(verificationResult => {
            if (!verificationResult.success) {
                res.sendStatus(500);
                return;
            }
            const message = _.pick(req.body, ['name', 'email', 'phone', 'message']);
            if (message.phone === '') delete message.phone; // Dynamo doesn't accept empty string
            return this._messageRepository.insertMessage(message).then(() => {
                this._notificationService.send(message);
                res.sendStatus(201);
            });
        }).catch(err => {
            console.log(err.stack);
            res.sendStatus(500);
        });
    }

}

module.exports = PostMessageHandler;