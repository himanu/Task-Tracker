import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";
import {addTask, deleteTask} from './Tasks';

export const getProjects = createAsyncThunk('getProjects', async(_, {rejectWithValue})=> {
  try {
    const {data: projectsObject} = await api.getProjects();
    console.log('projectsObject ', projectsObject);
    return projectsObject;
  } catch(error) {
    if(error.response) {
      // server has send a response with status code other than 2xx
      return rejectWithValue(error.response.data);
    } else if(error.request) {
      // client has sent a request but does not receive any response
      return rejectWithValue(error.request);
    } else {
      // request not sent
      return rejectWithValue(error.message);
    }
  }
})

export const addProject = createAsyncThunk('addProject', async(project_name, {getState, rejectWithValue})=> {
  try {
    const {data: project} = await api.addProject(project_name);
    const projectsObject = getState().projects.projectsObject;
    console.log('project ', project);
    return {
      ...projectsObject,
      [project._id]: project
    };
  } catch(error) {
    if(error.response) {
      // server has send a response with status code other than 2xx
      return rejectWithValue(error.response.data);
    } else if(error.request) {
      // client has sent a request but does not receive any response
      return rejectWithValue(error.request);
    } else {
      // request not sent
      return rejectWithValue(error.message);
    }
  }
})

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    isFetching: false,
    error: '',
    projectsObject: {}
  },
  reducers: {

  },
  extraReducers: (builders) => {
    builders
      .addCase(getProjects.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          error: ''
        }
      })
      .addCase(getProjects.fulfilled, (state, action)=>{
        return {
          ...state,
          isFetching: false,
          error: '',
          projectsObject: action.payload
        }
      })
      .addCase(getProjects.rejected, (state, action)=>{
        console.log('hello ', action.payload);
        return {
          ...state,
          isFetching: false,
          error: action.payload
        }
      })
      .addCase(addProject.pending, (state) => {
        return {
          ...state,
          isFetching: true,
          error: ''
        }
      })
      .addCase(addProject.fulfilled, (state, action)=>{
        return {
          ...state,
          isFetching: false,
          error: '',
          projectsObject: action.payload
        }
      })
      .addCase(addProject.rejected, (state, action)=>{
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        }
      })
      .addCase(addTask.fulfilled,(state, action) => {
        const { task } = action.payload;
        const projectId = task.parentProject, taskId = task._id;
        const updatedProjectsObject = {
          ...state.projectsObject,
          [projectId]: {
            ...state.projectsObject[projectId],
            tasks: [...state.projectsObject[projectId]['tasks'], taskId]
          }
        }
        return {
          ...state,
          projectsObject: updatedProjectsObject
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const {taskId, projectId} = action.payload;
        const tasks = state.projectsObject[projectId]['tasks'];
        const newTasks = tasks.filter((id) => {
          return id != taskId;
        });
        console.log("new tasks ", newTasks);
        return {
          ...state,
          projectsObject: {
            ...state.projectsObject,
            [projectId]: {
              ...state.projectsObject[projectId],
              tasks: newTasks
            }
          }
        }
      })
  }
});

export default projectsSlice.reducer;