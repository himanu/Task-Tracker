import React, { useState } from 'react';
import styles from './style.module.css';
import { CircularProgress } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function TaskModal({ task, updateTaskHandler, deleteTaskHandler }) {
  const [title, setTitle] = useState(task?.title);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(task?.description);
  const [completed, setCompleted] = useState(task?.completed);
  const [clicked, setClicked] = useState(false);
  
  async function updateTask() {
    setLoading(true);
    await updateTaskHandler({
      id: task.id,
      taskHeading: title,
      taskDescription: description,
      completed
    });
    setClicked(false);
    setLoading(false);
  }

  async function deleteTask() {
    try {
      setLoading(true);
      const taskId = task?.id;
      if (!taskId) {
        return;
      }
      await deleteTaskHandler(taskId);
      setLoading(false);
    } catch(err) {
      console.log("Something went wrong ", err);
      setLoading(false);
    }
  }

  return (
    <>
      {!clicked && 
        <div style={{ padding: '5px', background: 'rgb(246, 248, 249)', margin: '5px 0', cursor: 'pointer' }} onClick={() =>{setClicked(true)}} >
          {task?.title}
          <ArrowDropDownIcon />
        </div>}
      {clicked &&
        <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '1rem' }}>
          <form>
            <div>
              <input type="text" placeholder="Task Heading" style={{ border: 'none', outline: 'none' }} value={title}
                onChange={(e) => { setTitle(e.target.value) }} disabled={loading} />
              <textarea onChange={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; setDescription(e.target.value)}}
                value={description} placeholder="Task description" style={{ border: 'none', outline: 'none', width: '100%', marginTop: '10px', fontWeight: '300', fontSize: '0.8rem' }}
                disabled={loading}>
              </textarea>
              <label style={{marginRight: '5px'}}>Completed</label>
              <input type="checkbox" checked={completed} onChange={() => setCompleted((completed) => !completed)}></input>
            </div>
            <div style={{ marginTop: '10px' }}>
              {task &&
                <>
                  <button className={styles.btn + ' ' + styles.updateTaskBtn} style={{marginLeft: '5px'}} disabled={(title === task?.taskHeading && description === task?.taskDescription && completed === task?.completed) || loading}
                    onClick={updateTask}
                  >
                    Update Task
                  </button>
                  <button type='button' className={styles.btn + ' ' + styles.deleteTaskBtn} style={{marginLeft: '5px'}} onClick={deleteTask}>
                    Delete task
                  </button>
                  <button className={styles.btn + ' ' + styles.cancelBtn} style={{ marginLeft: '5px' }} onClick={() => setClicked(false)} disabled={loading}>
                    Cancel
                  </button>
                </>
              }
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
      }
    </>

  )
}
