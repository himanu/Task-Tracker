const client = require("../database");

/** get tasks of an project */
const getTasks = async (projectId) => {
    const projectsCursor = await client.db().collection('tasks').find({
        parentProject: projectId
    })
    const tasksObject = {};
    await projectsCursor.forEach((task) => {
        tasksObject[task._id] = task;
    })
    return tasksObject;
};

/** add a task to a project */
const addTask = async ({ projectId, taskHeading, taskDescription }) => {
    /** insert a task */
    const task = await client.db().collection('tasks').insertOne({
        taskHeading,
        taskDescription,
        parentProject: projectId,
        completed: false
    })
    /** add task to project */
    await client.db().collection('projects').findOneAndUpdate(
        {
            _id: new ObjectId(projectId),
        }, {
        $push: {
            tasks: task.insertedId
        }
    }, {
        returnDocument: 'after'
    }
    )
    return {
        _id: task.insertedId,
        taskHeading,
        taskDescription,
        parentProject: projectId,
        completed: false
    }
}

/** update a task */
const updateTask = async (task) => {
    try {
        const updatedTask = await client.db().collection('tasks').findOneAndUpdate({
            _id: new ObjectId(task._id)
        }, {
            $set: {
                taskHeading: task['taskHeading'],
                taskDescription: task['taskDescription'],
                completed: task['completed']
            }
        }, {
            returnDocument: 'after'
        }
        );
        return updatedTask;
    } catch (err) {
        console.log("Some error occured ", err);
        throw err;
    }
}

/** delete a task */
const deleteTask = async ({ taskId, projectId }) => {
    await client.db().collection('projects').updateOne({
        _id: new ObjectId(projectId)
    }, {
        $pull: {
            'tasks': new ObjectId(taskId)
        }
    }
    )
    await client.db().collection('tasks').deleteOne({
        _id: new ObjectId(taskId)
    })
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}