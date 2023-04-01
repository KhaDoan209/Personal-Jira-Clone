import { PayloadAction } from '@reduxjs/toolkit';
import { CreateProjectModel, ProjectDetailModel, ProjectModel, UpdateProjectModel, UserProjectModel } from '../../models/ProjectModel';
import { createNewProjectService, deleteProjectService, getListProjectService, getProjectDetailService, removeUserProjectService, updateProjectService, updateUserProjectService } from '../../services/projectService';
import { DispatchType } from '../configStore';
import { getListProjectReducer, getProjectDetailReducer } from '../reducer/projectReducer';
import { alertToast } from '../../utils/alert';
import { Bounce } from 'react-toastify';

export const getListProjectAction = () => {
   return async (dispatch: DispatchType) => {
      try {
         const result = await getListProjectService()
         const content: ProjectModel[] = result.data.content;
         const action: PayloadAction<ProjectModel[]> = getListProjectReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error);
      }
   };
};

export const createNewProjectAction = (data: CreateProjectModel) => {
   return async (dispatch: DispatchType) => {
      try {
         await createNewProjectService(data)
         const result = await getListProjectService()
         const content: ProjectModel[] = result.data.content;
         const action: PayloadAction<ProjectModel[]> = getListProjectReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error)
      }
   }
}
export const getProjectDetailAction = (id: any) => {
   return async (dispatch: DispatchType) => {
      try {
         const result = await getProjectDetailService(id)
         const content: ProjectDetailModel = result.data.content;
         const action: PayloadAction<ProjectDetailModel> = getProjectDetailReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error)
      }
   }
}

export const updateProjectAction = (id: number, data: UpdateProjectModel) => {
   return async (dispatch: DispatchType) => {
      try {
         await updateProjectService(id, data)
         alertToast.info('Project updated successfully', 'top-center', Bounce, 'dark')
         const result = await getListProjectService()
         const content: ProjectModel[] = result.data.content;
         const action: PayloadAction<ProjectModel[]> = getListProjectReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error)
      }
   }
}
export const updateUserProjectAction = (id: number, data: UserProjectModel) => {
   return async (dispatch: DispatchType) => {
      try {
         await updateUserProjectService(data)
         const result = await getProjectDetailService(id)
         const content: ProjectDetailModel = result.data.content;
         const action: PayloadAction<ProjectDetailModel> = getProjectDetailReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error)
      }
   }
}
export const removeUserProjectAction = (id: number, data: UserProjectModel) => {
   return async (dispatch: DispatchType) => {
      try {
         await removeUserProjectService(data)
         const result = await getProjectDetailService(id)
         const content: ProjectDetailModel = result.data.content;
         const action: PayloadAction<ProjectDetailModel> = getProjectDetailReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error)
      }
   }
}
export const deleteProjectAction = (id: number) => {
   return async (dispatch: DispatchType) => {
      try {
         await deleteProjectService(id)
         alertToast.error("Project deleted successfully", 'top-center', Bounce, 'dark')
         const result = await getListProjectService()
         const content: ProjectModel[] = result.data.content;
         const action: PayloadAction<ProjectModel[]> = getListProjectReducer(content)
         dispatch(action)
      } catch (error) {
         console.log(error)
      }
   }
}