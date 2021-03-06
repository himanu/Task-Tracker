import { useEffect, useState } from "react";
import BackgroundImg from "./BackgroundImg";
import AddIcon from '@mui/icons-material/Add';
import styles from './style.module.css';
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addTask, getTasks } from "../../Store/Slices/Tasks";
import { useNavigate } from 'react-router-dom';
import TaskModal from "./TaskModal";
const Todo = ({ projectId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTasks(projectId));
    }, [projectId])

    const { user } = useSelector((state) => state.auth);
    const { tasksObject } = useSelector((state) => state.tasks);
    const { projectsObject } = useSelector((state) => state.projects);

    const tasksIds = projectsObject[projectId]['tasks'];
    const [visibilityAddTaskForm, setVisibilityAddTaskForm] = useState('closed');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(null);
    let completedTaskIds = [];
    let pendingTaskIds = [];
    if (Object.keys(tasksObject).length && tasksIds?.length) {
        completedTaskIds = tasksIds.filter((taskId) => {
            if(tasksObject[taskId]?.completed) {
                return true;
            } else {
                pendingTaskIds.push(taskId);
                return false;
            }
        });
        console.log('Completed Task Ids ', completedTaskIds, 'pendingTaskIds ', pendingTaskIds);
    }

    function addTaskHandler() {
        setLoading(true);
        dispatch(addTask({
            projectId,
            taskHeading: title,
            taskDescription: description
        })).then((res) => {
            console.log('res ', res);
            if (res.error && res.payload === 'Authentication Failed') {
                return navigate(`/login?onSuccess=${window.location.pathname}`);
            }
            setLoading(false);
            setVisibilityAddTaskForm('closed');
        }).catch((err) => {
            console.log('err ', err);
            setError(err.message);
        })
            .then((res) => {
                console.log('res1 ', res);
                setLoading(false);
                setTitle('');
                setDescription('');
            })
        // setLoading(true);
        // // request server to add task
        // api.addTask({
        //     projectId, 
        //     taskHeading: title, 
        //     taskDescription: description})
        // .then((res) => {
        //     setLoading(false);
        //     setVisibilityAddTaskForm('closed');
        //     console.log('res ', res);
        // })
        // .catch((err) => {
        //     console.log('err ', err);
        //     setError(err.message);
        // })
        // .then(() => {
        //     setLoading(false);
        //     setTitle('');
        //     setDescription('');
        // });
    }

    return (
        <div style={{ width: '100%', background: '#fff', padding: '1rem', flex: '1', margin: '0 auto' }}>
            <div>
                <div>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}> Today </span> <span style={{ fontSize: '0.8rem', color: '#727272' }}> {new Date().toDateString()} </span>
                </div>
                <div>
                    <span style={{ fontSize: '0.8rem' }}> Welcome {user.name} ????, plan your project. </span>
                </div>
            </div>
            <div style={{padding: '5px', border: '1px solid #ccc', marginTop: '10px'}}>
                <h6>Pending Tasks ({pendingTaskIds.length})</h6>
                {(Object.keys(tasksObject).length && tasksIds?.length) ? tasksIds.map((taskId, idx) => {
                    const task = tasksObject[taskId];
                    if (!task) {
                        return;
                    } else if(!task['completed']){
                        return (
                            <div key={taskId} >
                                <TaskModal task={tasksObject[taskId]} />
                            </div>
                        )
                    }

                }) : (<div style={{fontSize: '14px'}}> Hurrah no work left </div>)}
            </div>
            <div style={{padding: '5px', border: '1px solid #ccc', marginTop: '10px'}}>
                <h6>Completed Task ({completedTaskIds.length})</h6>
                {(completedTaskIds.length) ? completedTaskIds.map((taskId, idx) => {
                    const task = tasksObject[taskId];
                    if (!task) {
                        return;
                    } else if (task['completed']) {
                        return (
                            <div key={taskId} >
                                <TaskModal task={tasksObject[taskId]} />
                            </div>
                        )
                    }

                }) : (
                    <div style={{fontSize: '14px'}}>
                        Do some work
                    </div>
                )}
            </div>
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

            {(visibilityAddTaskForm === 'closed' && tasksIds.length === 0) && (
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