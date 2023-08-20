const express = require("express");
const { getProjectsController, addProjectsController } = require("../controllers/projects.controller");
const signInController = require("../controllers/sign-in.controller");
const { getTasksController, addTaskController, updateTaskController, deleteTaskController } = require("../controllers/task.controller");
const { verifyIdToken, verifyJwtToken } = require("../middleware");

const router = express.Router();

/** sign in */
router.get('/signIn', verifyIdToken, signInController);

/** get list of projects */
router.get('/projects', verifyJwtToken, getProjectsController);

/** add a project */
router.post('/projects', verifyJwtToken, addProjectsController);

/** get tasks of a project */
router.get('/tasks/:projectId', verifyJwtToken, getTasksController);

/** add task */
router.post('/tasks', verifyJwtToken, addTaskController);

/** update task route */
router.put('/task/updateTask', verifyJwtToken, updateTaskController);

/** delete task route */
router.delete('/task/deleteTask', verifyJwtToken, deleteTaskController)

module.exports = router;