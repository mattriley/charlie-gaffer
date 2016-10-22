'use strict';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

class AppFactory {

    constructor(params) {
        this._postMessageHandler = params.postMessageHandler;
    }

    createApp() {
        const app = express();
        app.use(cors({origin: '*', credentials: true}));
        app.use(bodyParser.json());
        app.get('/', (req, res) => res.send('OK'));
        app.post('/messages', (req, res) => this._postMessageHandler.handle(req, res));
        return app;
    }

}

module.exports = AppFactory;