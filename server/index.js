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
    try {
        const payload = req.auth;
        await db.signInUser(payload);
        const {email, name, picture} = payload;
        res.status(200).send({user: {email, name, picture}});
    } catch(err) {
        console.log('Error occured ', err.message);
        res.status(500).send('Mongodb database error');
    }
})
app.get('/validateTokenId', verifyToken, async(req,res) => {
    const payload = req.auth;
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
app.post('/projects', verifyToken, async(req, res) => {
    const {email} = req.auth;
    const project_name = req.body.project_name;
    const project = await db.addProject(email, project_name);
    res.send(project);
})

app.post('/task', verifyToken, async(req, res) => {
    try {
        const updatedProject = await db.addTask(req.body);
        if(!updatedProject) {
            return res.status(403).send("Not found");
        }
        console.log('Updated Project ', updatedProject);
        res.status(200).send({
            data: updatedProject
        })
    } catch(err) {
        res.status(400).send({
            err: err.message
        })
    }
})

app.listen(4000,()=>{
    console.log("live");
})