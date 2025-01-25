import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addProject,
  fetchProjects,
  getMemberInProject,
  removeProject,
  TAddProject,
  TProjectData
} from '../../utils/everydayToDo-api';
import { TProjectList } from '../slices/project.slice';
import { IServerResponse, TAddMember, TGetMemberProject } from '@utils-types';

export const addProjectData = createAsyncThunk(
  'project/addProjectData',
  async (data: TProjectList, { rejectWithValue }) => {
    try {
      const response = await addProject(data);
      return response.project;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMember = createAsyncThunk(
  'project/addMemberProject',
  async (data: TAddMember, { rejectWithValue }) => {
    try {
      const response = await addMember(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMember = createAsyncThunk(
  'project/getMemberProject',
  async (data: { email: string; project: string }, { rejectWithValue }) => {
    try {
      const responseData: IServerResponse = await getMemberInProject(data);

      if (responseData.success) {
        return responseData.data;
      } else {
        return rejectWithValue('Member not found');
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectData = createAsyncThunk(
  'project/fetchProjectsData',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetchProjects(email);
      return response.project;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeProjectData = createAsyncThunk(
  'project/removeProjectData',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await removeProject(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
