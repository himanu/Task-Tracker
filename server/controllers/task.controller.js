const { getTasks, addTask, updateTask, deleteTask } = require("../services/task.service");

const getTasksController = async (req, res) => {
    try {
    const projectId = req.params.projectId;
    const tasksObject = await getTasks(projectId);
    res.send(tasksObject);
    } catch(err) {
        console.log("Error ", err);
        res.status(500).send("Error");
    }
};

const addTaskController = async (req, res) => {
    try {
        const task = await addTask(req.body);
        console.log('task ', task);
        res.status(201).send({
            task
        })
    } catch (err) {
        console.log("Error ", err);
        res.status(500).send("Error");
    }
}

const updateTaskController = async (req, res) => {
    try {
        const task = await (await updateTask(req.body)).value;
        console.log('updated task ', task);
        res.status(201).send({
            task
        })
    } catch (err) {
        res.status(500).send({
            error: err.message
        })
    }
};

const deleteTaskController = async (req, res) => {
    try {
        const taskId = req.query.taskId, projectId = req.query.projectId;
        console.log('taskId ', taskId, ' projectId ', projectId);
        await deleteTask({ taskId, projectId });
        res.status(201).send("Deleted")
    } catch (err) {
        console.log("Err ", err);
        res.status(500).send({
            error: err.message
        })
    }
}
module.exports = {
    getTasksController,
    addTaskController,
    updateTaskController,
    deleteTaskController
};