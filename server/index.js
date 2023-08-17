const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = require('./routes');
const client = require('./database');
dotenv.config();

const app = express();
app.use(bodyParser.json()); app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', ['content-type', 'Authorization']);
    next();
})
app.use(router);

/** connect to db and turn on nodejs server */
client.connect().then(() => {
    console.log("Connected to DB");
    /** start nodejs server */
    app.listen(4000, () => {
        console.log("live");
    })
}).catch((err) => {
    console.log("DB connection fails");
})