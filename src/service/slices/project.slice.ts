import { createSlice, nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getUserData, TUser, TUserState } from './user.slice';
import {
  addProjectData,
  getMember,
  getProjectData,
  removeProjectData
} from '../Asyncs/project';
import { TProjectData } from 'src/utils/everydayToDo-api';

export type TProjectList = {
  id: string;
  owner?: string;
  name: string;
  member?: string;
};

export interface IProjectList {
  projects: TProjectList[];
  isLoadingAdd: boolean;
  isLoadingList: boolean;
  isMember?: boolean;
}

const initialState: IProjectList = {
  projects: [],
  isLoadingAdd: false,
  isLoadingList: false
};

export const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    addProject: (state, { payload: item }) => {
      const newProject = { ...item, id: nanoid() };
      state.projects.push(newProject);
    }
  },
  selectors: {
    getProjects: (state) => state.projects,
    getLoadingProject: (state) => state.isLoadingList,
    getProjectsMember: (state: IProjectList) =>
      state.projects.map((project) => project.member)
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProjectData.pending, (state) => {
        state.isLoadingAdd = true;
      })
      .addCase(addProjectData.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.projects.push(...action.payload);
        } else {
          state.projects.push(action.payload);
        }
      })

      .addCase(getProjectData.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(getProjectData.fulfilled, (state, action) => {
        state.isLoadingList = false;
        const newProjects = (action.payload as TProjectData[]).filter(
          (newProject) =>
            !state.projects.some((project) => project.id === newProject.id)
        );
        state.projects = [...state.projects, ...newProjects];
      })
      .addCase(removeProjectData.pending, (state) => {
        state.isLoadingList = true;
      })
      .addCase(removeProjectData.fulfilled, (state, { payload: item }) => {
        state.projects = state.projects.filter((i) => i.id !== item.id);
      })
      .addCase(getMember.fulfilled, (state, { payload: item }) => {
        //console.log(item);
      });
  }
});

export const { reducer } = projectListSlice;
export const { addProject } = projectListSlice.actions;
export const { getProjects, getProjectsMember, getLoadingProject } =
  projectListSlice.selectors;
export const getUserName = (state: { user: TUser }) => state.user?.name;
