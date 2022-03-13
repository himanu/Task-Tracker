const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {verifyToken} = require('./middleware');
const { db } = require('./database');
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/', (req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', ['content-type', 'Authorization']);
    next();
})

app.get('/signIn', verifyToken, async(req,res)=>{
    const payload = req.auth;
    // const isAlreadyAMember = await db.isAlreadyAMember(payload.email);
    // if(!isAlreadyAMember) {
    //     console.log('New Member');
    //     await db.addNewMember(payload);
    // } else {
    //     console.log('is already a member');
    // }
    res.status(200).send({
        payload
    })
})

app.get('/projects', verifyToken, async(req, res) => {
    const {email} = req.auth;
    const projectsObject = await db.getProjects(email);
    console.log('All projects ', projectsObject);
    res.send(projectsObject);
})


app.listen(4000,()=>{
    console.log("live");
})