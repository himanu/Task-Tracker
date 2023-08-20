const sequelize = require("../database");

const TaskModel = sequelize.models.Tasks;
/** get tasks of an project */
const getTasks = async (projectId) => {
    const tasks = await TaskModel.findAll({
        where: {
            project_id: projectId
        }
    })
    // const tasksObject = {};
    // await projectsCursor.forEach((task) => {
    //     tasksObject[task._id] = task;
    // })
    return tasks;
};

/** add a task to a project */
const addTask = async ({ projectId, taskHeading, taskDescription="" }) => {
    /** check whether a task exist with same heading */
    const taskExist = await TaskModel.findOne({
        where: {
            project_id: projectId,
            title: taskHeading
        }
    })
    if (taskExist) {
        throw {
            status: 405,
            message: "Task with same heading already exist"
        };
    }

    /** insert a task */
    return await TaskModel.create({
        title: taskHeading,
        description: taskDescription,
        completed: false,
        project_id: projectId
    });
}

/** update a task */
const updateTask = async (body) => {
    try {
        const task = await TaskModel.findOne({
            where: {
                id: body.id
            }
        });
        if (!task)
            throw {
                status: 404,
                message: "No task with provided id"
            }
        task.title = body.taskHeading;
        task.description = body.taskDescription;
        task.completed = body.completed;
        await task.save();
        console.log("Successfully updated task");
        return task;
    } catch (err) {
        console.log("Some error occured ", err);
        throw err;
    }
}

/** delete a task */
const deleteTask = async (taskId) => {
    await TaskModel.destroy({
        where: {
            id: taskId
        }
    });
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}