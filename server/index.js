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
        res.status(200).send({
            user: {email, name, picture}
        });
    } catch(err) {
        console.log('Error occured ', err.message);
        res.status(500).send({
            error: err.message
        });
    }
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
app.get('/tasks/:projectId', verifyToken, async(req, res) => {
    const projectId = req.params.projectId;
    const tasksObject = await db.getTasks(projectId);
    res.send(tasksObject);
})
app.post('/tasks', verifyToken, async(req, res) => {
    try {
        const task = await db.addTask(req.body);
        console.log('task ', task);
        res.status(201).send({
            task
        })
    } catch(err) {
        res.status(500).send({
            error: err.message
        })
    }
})
app.post('/task/updateTask', verifyToken, async(req,res) => {
    try {
        const task = await (await db.updateTask(req.body)).value;
        console.log('updated task ', task);
        res.status(201).send({
            task
        })
    } catch(err) {
        res.status(500).send({
            error: err.message
        })
    }
})

app.delete('/task/deleteTask', verifyToken, async(req,res) => {
    try {
        const taskId = req.query.taskId, projectId = req.query.projectId;
        console.log('taskId ', taskId, ' projectId ', projectId);
        await db.deleteTask({taskId, projectId});
        res.status(201).send("Deleted")
    } catch(err) {
        console.log("Err ",err);
        res.status(500).send({
            error: err.message
        })
    }
})

app.listen(4000,()=>{
    console.log("live");
})