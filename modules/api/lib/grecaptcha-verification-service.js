'use strict';

const fetch = require('node-fetch');

class GrecaptchaVerificationService {

    constructor(params) {
        this._secret = params.secret;
    }

    verify(params) {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this._secret}&response=${params.response}`;
        return fetch(url, {method: 'POST'}).then(res => res.json());
    }

}

module.exports = GrecaptchaVerificationService;