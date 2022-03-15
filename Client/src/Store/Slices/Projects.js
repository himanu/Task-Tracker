import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const getProjects = createAsyncThunk('getProjects', async(projectIds)=> {
  const projects = await api.getProjects(projectIds);
})