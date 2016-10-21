'use strict';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = params => {
    const app = express();
    app.use(cors({origin: '*', credentials: true}));
    app.use(bodyParser.json());

    app.post('/messages', (req, res) => {
        params.grecaptchaVerificationService.verify({
            response: req.body.grecaptchaResponse
        }).then(verificationResult => {
            if (verificationResult.success) {
                return params.messageRepository.insertMessage(req.body.message).then(() => {
                    // TODO: send email notification.
                    res.sendStatus(201);
                });
            } else {
                res.sendStatus(500);
            }
        }).catch(err => {
            console.log(err);
        })
    });

    app.get('/', (req, res) => {
        res.send('OK');
    });

    return app;
};