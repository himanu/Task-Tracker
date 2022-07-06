import api from '../../api';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
  isFetching: false,
  error: '',
  tasksObject: {}
};
export const addTask = createAsyncThunk('addTask', async({projectId, taskHeading, taskDescription}, {getState, rejectWithValue}) => {
  try {
    const {data: {
      task
    }} = await api.addTask({
      projectId,
      taskHeading,
      taskDescription
    })
    
    console.log('task ', task);
    const tasksObject = getState().tasks.tasksObject;
    return {
      task,
      updatedTaskObject: {
      ...tasksObject,
      [task._id]: task
    }}
  } catch(err) {
    if(err.response) {
      const {error} = err.response.data;
      console.log('Yes ', err.response.data);
      if(error)
        return rejectWithValue(error);
      return rejectWithValue(err.response.data);
    }else if(err.request) {
      // client has sent a request but does not receive any response
      return rejectWithValue(err.request);
    } else {
      // request not sent
      return rejectWithValue(err.message);
    }
  }
})

export const getTasks = createAsyncThunk('getTasks', async(projectId) => {
  const {data: tasksObject} = await api.getTasks(projectId);
  return tasksObject;
})

export const deleteTask = createAsyncThunk('deleteTask', async({taskId, projectId}, {getState, rejectWithValue})=>{
  const res = api.deleteTask(taskId, projectId);
  return {taskId, projectId};
})

const TaskSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    updateTasksObject(state, action) {
      const tasksObject = state.tasksObject;
      const task = action.payload;
      console.log('task in reducer ', task);
      return {
        ...state,
        tasksObject: {
          ...tasksObject,
          [task._id]: task
        }
      }
    },
    // deleteTask(state, action) {
    //   const tasksObject = state.tasksObject;
    //   const {taskId} = action.payload;
    //   let newTasksObject ={};
    //   Object.keys(tasksObject).map((id) => {
    //     if(id != taskId) {
    //       newTasksObject[id] = tasksObject[id];
    //     }
    //   })
    //   return {
    //     ...state,
    //     tasksObject: newTasksObject
    //   }
    // }
  },
  extraReducers: (builders) => {
    builders
      .addCase(getTasks.pending, (state, action) => {
        return {
          ...state,
          isFetching: true,
          error: ''
        }
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        return {
          ...state,
          isFetching: false,
          tasksObject: action.payload,
        }
      })
      .addCase(getTasks.rejected, (state, action) => {
        return {
          ...state,
          isFetching: false,
          error: action.payload
        }
      })
      .addCase(addTask.pending, (state, action) => {
        return {
          ...state,
          isFetching: true,
          error: ''
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        return {
          ...state,
          isFetching: false,
          tasksObject: action.payload.updatedTaskObject,
          error: ''
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        return {
          ...state,
          isFetching: false,
          error: 'Error '
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasksObject = state.tasksObject;
        const {taskId} = action.payload;
        let newTasksObject ={};
        Object.keys(tasksObject).map((id) => {
          if(id != taskId) {
            newTasksObject[id] = tasksObject[id];
          }
        })
        return {
          ...state,
          tasksObject: newTasksObject
        }
        })
  }
});

export default TaskSlice.reducer;
export const {updateTasksObject} = TaskSlice.actions;