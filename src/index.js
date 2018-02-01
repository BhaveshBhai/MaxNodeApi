require('dotenv').config()
const admin = require('./firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';

const router = require('./routes');

app.use('/', router);


app.listen(port, host);

console.log(`Server listening at ${host}:${port}`);
