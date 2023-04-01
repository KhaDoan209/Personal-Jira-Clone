import { PayloadAction } from "@reduxjs/toolkit";
import { StatusModel } from "../../models/StatusModel";
import { CreateTaskModel, TaskModel } from "../../models/TaskModel";
import { getProjectDetailService } from "../../services/projectService";
import { ProjectDetailModel } from "../../models/ProjectModel";
import { createTaskService, getAllStatusService, getTaskDetailService, removeTaskService, updateTaskDetailService } from "../../services/taskService";
import { getProjectDetailReducer } from "../reducer/projectReducer";
import { DispatchType } from "../configStore"
import { getAllStatusReducer, getTaskDetailReducer } from "../reducer/taskReducer";
export const getAllStatusAction = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await getAllStatusService()
            const content: StatusModel[] = result.data.content
            const action: PayloadAction<StatusModel[]> = getAllStatusReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    };
}

export const createTaskAction = (data: CreateTaskModel) => {
    return async (dispatch: DispatchType) => {
        try {
            await createTaskService(data)
            const result = await getProjectDetailService(data.projectId)
            const content: ProjectDetailModel = result.data.content;
            const action: PayloadAction<ProjectDetailModel> = getProjectDetailReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}
export const getTaskDetailAction = (id: any) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await getTaskDetailService(id)
            const content: TaskModel = result.data.content
            const action: PayloadAction<TaskModel> = getTaskDetailReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateTaskDetailAction = (data: CreateTaskModel) => {
    return async (dispatch: DispatchType) => {
        try {
            await updateTaskDetailService(data)
            const result = await getProjectDetailService(data.projectId)
            const content: ProjectDetailModel = result.data.content;
            const action: PayloadAction<ProjectDetailModel> = getProjectDetailReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}
export const removeTaskAction = (projectId: number, id: number) => {
    return async (dispatch: DispatchType) => {
        try {
            await removeTaskService(id)
            const result = await getProjectDetailService(projectId)
            const content: ProjectDetailModel = result.data.content;
            const action: PayloadAction<ProjectDetailModel> = getProjectDetailReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}