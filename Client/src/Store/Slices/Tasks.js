const { createSlice } = require("@reduxjs/toolkit");
const initialState = {};

const TaskSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      
    },
    readTask(state, action) {
      
    },
    updateTask() {
      
    },
    deleteTask() {
      
    }
  }
});

export default TaskSlice.reducer;