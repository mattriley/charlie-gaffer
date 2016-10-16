'use strict';

const AWS = require('aws-sdk');
const cors = require('cors');
const express = require('express');
const messaging = require('messaging');

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const messageRepository = messaging.createMessageRepository({dynamoClient});
const app = express();

app.use(cors({origin: '*', credentials: true}));

app.post('/messages', (req, res) => {
    res.send('OK');
});

app.get('/', (req, res) => {
    res.send('OK');
});

module.exports = app;