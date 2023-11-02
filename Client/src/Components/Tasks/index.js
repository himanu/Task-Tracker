import { useContext, useEffect, useReducer, useState } from "react";
import BackgroundImg from "./BackgroundImg";
import AddIcon from '@mui/icons-material/Add';
import styles from './style.module.css';
import { CircularProgress } from "@mui/material";
import TaskModal from "./TaskModal";
import api from "../../api";
import { UserContext } from "../../contexts/user.context";

const filterTasks = (tasks) => {
    const completedTasks = [], pendingTasks = [];
    if (tasks.length) {
        tasks.forEach((task) => {
            if (task.completed) 
              completedTasks.push(task);
            else
              pendingTasks.push(task);
        })
    }
    return {
        completedTasks,
        pendingTasks
    };
}
const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case "add-task": {
            return [...tasks, action.task];
        }
        case "load-tasks": {
            return action.tasks
        }
        case "update-task": {
            return tasks.map((task) => task.id === action.task.id ? action.task : task);
        }
        case "delete-task": {
            return tasks.filter((task) => task.id !== action.taskId);
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};
const Todo = ({ projectId }) => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visibilityAddTaskForm, setVisibilityAddTaskForm] = useState('closed');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(UserContext);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const response = (await api.getTasks(projectId)).data;
            dispatch({
                type: "load-tasks",
                tasks: response
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function addTaskHandler() {
        try {
            setLoading(true);
            /** add a task */
            const task = (await api.addTask({
                projectId,
                taskHeading: title,
                taskDescription: description
            })).data.task;
            dispatch({
                type: "add-task",
                task
            });
            setVisibilityAddTaskForm('closed');
            setLoading(false);
            setTitle('');
            setDescription('');
        } catch (err) {
            console.log("Error ", err);
            setError(err.message);
        }
    };

    const updateTaskHandler = async (task) => {
        const res = await api.updateTask(task)
        const updatedTask = res?.data?.task;
        if (updatedTask) {
            console.log('updatedTask ', updatedTask);
            dispatch({
                type: "update-task",
                task: updatedTask
            });
        }
    };

    const deleteTaskHandler = async (taskId) => {
        try {
            await api.deleteTask(taskId);
            dispatch({
                type: "delete-task",
                taskId
            })
        } catch (err) {
            console.log("Something went wrong while deleting task");
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    console.log("Tasks ", tasks);
    const { completedTasks, pendingTasks} = filterTasks(tasks);

    return (
        <div style={{ width: '100%', background: '#fff', padding: '1rem', flex: '1', margin: '0 auto' }}>
            <div>
                <div>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}> Today </span> <span style={{ fontSize: '0.8rem', color: '#727272' }}> {new Date().toDateString()} </span>
                </div>
                <div>
                    <span style={{ fontSize: '0.8rem' }}> Welcome {user.name} 🤗, plan your project. </span>
                </div>
            </div>
            {!!tasks?.length && (
                <>
                    <div style={{padding: '5px', border: '1px solid #ccc', marginTop: '10px'}}>
                        <h6>Pending Tasks ({pendingTasks.length})</h6>
                        {pendingTasks.length ? pendingTasks.map((task, idx) => (
                            <div key={task.id} >
                                <TaskModal task={task} updateTaskHandler={updateTaskHandler} deleteTaskHandler={deleteTaskHandler} />
                            </div>

                        )) : (<div style={{fontSize: '14px'}}> Hurrah no work left </div>)}
                    </div>
                    <div style={{padding: '5px', border: '1px solid #ccc', marginTop: '10px'}}>
                        <h6>Completed Task ({completedTasks.length})</h6>
                        {(completedTasks.length) ? completedTasks.map((task, idx) => (
                            <div key={task.id} >
                                <TaskModal task={task} updateTaskHandler={updateTaskHandler} deleteTaskHandler={deleteTaskHandler} />
                            </div>
                        )) : (
                            <div style={{fontSize: '14px'}}>
                                {tasks.length ? "Let's start completing task" : "Create a task"}
                            </div>
                        )}
                    </div>
                </>
            )}
            {visibilityAddTaskForm === 'closed' && (
                <div style={{ margin: '0.5rem 0', padding: '0.5rem', border: '1.5px solid #ccc' }}>
                    <div className={styles.addTask} onClick={() => setVisibilityAddTaskForm('open')}>
                        <AddIcon className={styles.addIcon} />
                        <span className={styles.text}>
                            Add Task
                        </span>
                    </div>
                </div>
            )}

            {(visibilityAddTaskForm === 'closed' && tasks.length === 0) && (
                <div style={{ textAlign: 'center' }}>
                    <BackgroundImg />
                    <div style={{ fontSize: '0.8rem' }}>Get a clear view of the day ahead.</div>
                    <button className={styles.btn + ' ' + styles.addTaskBtn} style={{ marginTop: '1rem' }} onClick={() => setVisibilityAddTaskForm('open')}> Add a task </button>
                </div>
            )}

            {visibilityAddTaskForm === 'open' && (
                <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '1rem' }}>
                    <form>
                        <div>
                            <input type="text" placeholder="Task Heading" style={{ border: 'none', outline: 'none' }} value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />
                            <textarea onChange={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; setDescription(e.target.value) }} value={description} placeholder="Task description" style={{ border: 'none', outline: 'none', width: '100%', marginTop: '10px', fontWeight: '300', fontSize: '0.8rem' }} disabled={loading}></textarea>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <button className={styles.btn + ' ' + styles.addTaskBtn} disabled={!title || loading} onClick={addTaskHandler}>
                                Add Task
                            </button>
                            <button className={styles.btn + ' ' + styles.cancelBtn} style={{ marginLeft: '5px' }} onClick={() => setVisibilityAddTaskForm('closed')} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    {loading && (
                        <>
                            <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', background: '#ccc', opacity: '0.5' }}>

                            </div>
                            <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0%', left: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress style={{ color: '#333' }} />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
export default Todo;