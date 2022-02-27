const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {verifyToken} = require('./middleware');
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/', (req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', ['content-type', 'Authorization']);
    next();
})
app.get('/validateTokenId', verifyToken, async(req,res)=>{
    const payload = req.auth;
    res.status(200).send({
        payload
    })
})


app.post('/tasks/add', verifyToken, (req,res,next)=> {
    res.send('hii');
})

app.listen(4000,()=>{
    console.log("live");
})