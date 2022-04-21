import api from '../../api';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {
  isFetching: false,
  error: '',
  tasksObject: {}
};
export const addTask = createAsyncThunk('addTask', async({projectId, taskHeading, taskDescription}, {getState}) => {
  const {data: {
    task
  }} = await api.addTask({
    projectId,
    taskHeading,
    taskDescription
  });
  
  console.log('task ', task);
  const tasksObject = getState().tasks.tasksObject;
  return {
    task,
    updatedTaskObject: {
    ...tasksObject,
    [task._id]: task
  }}
})

export const getTasks = createAsyncThunk('getTasks', async(projectId) => {
  const {data: tasksObject} = await api.getTasks(projectId);
  return tasksObject;
})
const TaskSlice = createSlice({
  name: 'Tasks',
  initialState,
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
          error: action.payload
        }
      })
  }
});

export default TaskSlice.reducer;