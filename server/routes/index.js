const express = require("express");
const { getProjectsController, addProjectsController } = require("../controllers/projects.controller");
const signInController = require("../controllers/sign-in.controller");
const { getTasksController, addTaskController, updateTaskController, deleteTaskController } = require("../controllers/task.controller");
const { db } = require("../database");
const { verifyToken } = require("../middleware");

const router = express.Router();

/** sign in */
router.get('/signIn', verifyToken, signInController);

/** get list of projects */
router.get('/projects', verifyToken, getProjectsController);

/** add a project */
router.post('/projects', verifyToken, addProjectsController);

/** get tasks of a project */
router.get('/tasks/:projectId', verifyToken, getTasksController);

/** add task */
router.post('/tasks', verifyToken, addTaskController);

/** update task route */
router.post('/task/updateTask', verifyToken, updateTaskController);

/** delete task route */
router.delete('/task/deleteTask', verifyToken, deleteTaskController)

module.exports = router;