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
        res.status(err.status || 500).send(err.message || "Error");
    }
}

const updateTaskController = async (req, res) => {
    try {
        const task = await updateTask(req.body);
        console.log('updated task ', task);
        res.status(201).send({
            task
        })
    } catch (err) {
        console.log("Erorr ", err.status);
        res.status(err.status || 500).send({
            error: err.message
        })
    }
};

const deleteTaskController = async (req, res) => {
    try {
        const taskId = req.query.taskId;
        await deleteTask(taskId);
        res.status(201).send("Deleted")
    } catch (err) {
        console.log("Error ", err);
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