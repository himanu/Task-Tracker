const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {OAuth2Client} = require('google-auth-library');
dotenv.config();

const app = express();
const client = new OAuth2Client(process.env.CLIENT_ID);

app.use(bodyParser.json());
app.use('/', (req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
})

app.post('/validateTokenId', async(req,res)=>{
    const tokenId = req.body.tokenId;
    console.log("Hi I receive a request");
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        res.status(200).send({
            payload
        })
    } catch(err) {
        console.log(err);
        res.status(401).send({
            message: 'Not authorised'
        });
    }
    res.end();
})

app.listen(4000,()=>{
    console.log("live");
})