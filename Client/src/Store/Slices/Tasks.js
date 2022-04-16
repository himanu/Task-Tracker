import api from '../../api';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = {};
export const addTask = createAsyncThunk('addTask', async({projectId, taskHeading, taskDescription}) => {
  const {data: {
    task
  }} = await api.addTask({
    projectId,
    taskHeading,
    taskDescription
  });
  console.log('task ', task);
  return task;
})
const TaskSlice = createSlice({
  name: 'Tasks',
  initialState,
});

export default TaskSlice.reducer;