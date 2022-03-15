import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

export const getProjects = createAsyncThunk('getProjects', async(projectIds, {rejectWithValue})=> {
  try {
    const {data: projectsObject} = await api.getProjects(projectIds);
    return projectsObject;
  } catch(error) {
    if(error.response) {
      // server has send a response with status code other than 2xx
      rejectWithValue(error.response.data);
    } else if(error.request) {
      // client has sent a request but does not receive any response
      rejectWithValue(error.request);
    } else {
      // request not sent
      rejectWithValue(error.message);
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
  extraReducers: (builders) => {
    builders
      .addCase(getProjects.pending, (state) => {
        return {
          ...state,
          isFetching: true
        }
      })
      .addCase(getProjects.fulfilled, (state, action)=>{
        return {
          ...state,
          isFetching: false,
          projectsObject: action.payload
        }
      })
      .addCase(getProjects.rejected, (state, action)=>{
        return {
          ...state,
          isFetching: false,
          error: action.payload,
          projectsObject: {}
        }
      })
  }
});

export default projectsSlice.reducer;