import { CreateTaskModel } from "../models/TaskModel";
import { http } from "./config";

export const getAllStatusService = () => {
    return http.get(`api/Status/getAll`)
}
export const getTaskDetailService = (id: any) => {
    return http.get(`api/Project/getTaskDetail?taskId=${id}`)
}
export const updateTaskDetailService = (data: CreateTaskModel) => {
    return http.post(`api/Project/updateTask`, data)
}
export const removeTaskService = (id: number) => {
    return http.delete(`/api/Project/removeTask?taskId=${id}`)
}
export const createTaskService = (data: CreateTaskModel) => {
    return http.post(`api/Project/createTask`, data)
}
