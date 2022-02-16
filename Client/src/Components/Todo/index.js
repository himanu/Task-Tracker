import { useSelector } from "react-redux";
import { getAuthState } from "../../Store/Selectors/Auth";
import BackgroundImg from "./BackgroundImg";
import AddIcon from '@mui/icons-material/Add';
import styles from './style.module.css';
const Todo = () => {
    const {user} = useSelector(getAuthState);
    const todos = [];
    return (
        <div style={{width: '60%', background: '#fff', padding: '1rem',flex: '1', margin: '0 auto'}}>
            <div>
                <div>
                    <span style={{fontSize: '1rem', fontWeight: 'bold'}}> Today </span> <span style={{fontSize: '0.8rem', color: '#727272'}}> {new Date().toDateString()} </span>
                </div>
                <div>
                    <span style={{fontSize: '0.8rem'}}> Welcome {(user.name).split(' ')[0]} 🤗, plan your day. </span>
                </div>
            </div>
            <div style={{margin: '1rem 0'}}>
                <div className={styles.addTask}>
                    <AddIcon className={styles.addIcon}/>
                    Add Task
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                {todos.length === 0 && ( <BackgroundImg /> )}
                <div style={{fontSize: '0.8rem'}}>Get a clear view of the day ahead.</div>
                <button className={styles.addTaskBtn}> Add a task </button>
            </div>
        </div>
    )
}
export default Todo;