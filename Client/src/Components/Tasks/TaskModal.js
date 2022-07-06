import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { CircularProgress } from "@mui/material";
import api from '../../api';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTasksObject } from '../../Store/Slices/Tasks';


export default function TaskModal({ task }) {
  const [title, setTitle] = useState(task?.taskHeading);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(task?.taskDescription);
  const [completed, setCompleted] = useState(task?.completed);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  
  async function updateTask() {
    setLoading(true);
    const res = await api.updateTask({
      _id: task._id,
      taskHeading: title,
      taskDescription: description,
      completed
    })
    const updatedTask = res?.data?.task;
    if(updatedTask) {
      console.log('updatedTask ', updatedTask);
      dispatch(updateTasksObject(updatedTask));
    }
    setClicked(false);
    setLoading(false);
    console.log("response from api ", res);
  }

  async function deleteTaskHandler() {
    try {
      setLoading(true);
      const taskId = task?._id;
      const projectId = task?.parentProject;
      if (!taskId) {
        return;
      }
      dispatch(deleteTask({taskId, projectId}));
    } catch(err) {
      console.log("Something went wrong ", err);
      setLoading(false);
    }
  }

  return (
    <>
      {!clicked && 
        <div style={{ padding: '5px', background: 'rgb(246, 248, 249)', margin: '5px 0', cursor: 'pointer' }} onClick={() =>{setClicked(true)}} >
          {task?.taskHeading}
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
                  <button className={styles.btn + ' ' + styles.updateTaskBtn} style={{marginLeft: '5px'}} disabled={(title == task?.taskHeading && description == task?.taskDescription && completed == task?.completed) || loading}
                    onClick={updateTask}
                  >
                    Update Task
                  </button>
                  <button type='button' className={styles.btn + ' ' + styles.deleteTaskBtn} style={{marginLeft: '5px'}} onClick={deleteTaskHandler}>
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
