import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "../../Store/Selectors/Auth";
import BackgroundImg from "./BackgroundImg";
import AddIcon from '@mui/icons-material/Add';
import styles from './style.module.css';
import { CircularProgress } from "@mui/material";
import api from "../../api";
const Todo = () => {
    const {user} = useSelector(getAuthState);
    const [visibilityAddTaskForm, setVisibilityAddTaskForm] = useState('closed');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(null);
    
    function addTaskHandler() {
        setLoading(true);
        // request server to add task
        api.addTask({title, description})
        .then((res) => {
            setLoading(false);
            setVisibilityAddTaskForm('closed');
            console.log('res ', res);
        })
        .catch((err) => {
            console.log('err ', err);
            setError(err.message);
        })
        .then(() => {
            setLoading(false);
            setTitle('');
            setDescription('');
        });
    } 

    const tasks = [];
    return (
        <div style={{width: '100%', background: '#fff', padding: '1rem',flex: '1', margin: '0 auto'}}>
            {/* <div>
                <div>
                    <span style={{fontSize: '1rem', fontWeight: 'bold'}}> Today </span> <span style={{fontSize: '0.8rem', color: '#727272'}}> {new Date().toDateString()} </span>
                </div>
                <div>
                    <span style={{fontSize: '0.8rem'}}> Welcome {(user.name).split(' ')[0]} 🤗, plan your day. </span>
                </div>
            </div> */}
            { visibilityAddTaskForm === 'closed' && (
                <div style={{margin: '1rem 0'}}>
                    <div className={styles.addTask} onClick={() => setVisibilityAddTaskForm('open')}>
                        <AddIcon className={styles.addIcon}/>
                        Add Task
                    </div>
                </div>
            )}

            { (visibilityAddTaskForm === 'closed' && tasks.length === 0) && (
                <div style={{textAlign: 'center'}}>
                    <BackgroundImg />
                    <div style={{fontSize: '0.8rem'}}>Get a clear view of the day ahead.</div>
                    <button className={styles.btn + ' ' + styles.addTaskBtn} style={{marginTop: '1rem'}} onClick={() => setVisibilityAddTaskForm('open')}> Add a task </button>
                </div>
            )}
            
            {visibilityAddTaskForm === 'open' && (
                <div style={{border: '1px solid #ddd', padding: '10px', marginTop: '1rem'}}>
                    <form>
                        <div>
                            <input type="text" placeholder="Task Heading" style={{border: 'none',outline: 'none'}} value={title} onChange={(e)=>setTitle(e.target.value)} disabled={loading}/>
                            <textarea onChange={(e) =>{ e.target.style.height = 'auto';e.target.style.height = e.target.scrollHeight + 'px'; setDescription(e.target.value)}} value={description} placeholder="Task description" style={{border: 'none', outline: 'none', width: '100%', marginTop: '10px', fontWeight: '300', fontSize: '0.8rem'}} disabled={loading}></textarea>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <button className={styles.btn+ ' ' + styles.addTaskBtn} disabled={!title || loading} onClick={addTaskHandler}>
                                Add Task
                            </button>
                            <button className={styles.btn + ' ' + styles.cancelBtn} style={{marginLeft: '5px'}} onClick={()=> setVisibilityAddTaskForm('closed')} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    {loading && (
                        <>
                            <div style={{width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', background: '#ccc', opacity: '0.5'}}>

                            </div>
                            <div style={{width: '100%', height: '100%', position: 'absolute', top: '0%', left: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress style={{color: '#333'}} />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
export default Todo;