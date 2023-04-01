import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectDetailModel, ProjectModel } from '../../models/ProjectModel';
import { ProjectState } from '../states/ProjectState';
const initialState: ProjectState = {
   listProject: [],
   projectDetail: null,
};

const projectReducer = createSlice({
   name: 'projectReducer',
   initialState,
   reducers: {
      getListProjectReducer: (state: ProjectState, action: PayloadAction<ProjectModel[]>) => {
         state.listProject = action.payload
      },
      getProjectDetailReducer: (state: ProjectState, action: PayloadAction<ProjectDetailModel>) => {
         state.projectDetail = action.payload
      }
   },

});

export const { getListProjectReducer, getProjectDetailReducer } = projectReducer.actions;

export default projectReducer.reducer;
