'use strict';

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
            const message = req.body.message;
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