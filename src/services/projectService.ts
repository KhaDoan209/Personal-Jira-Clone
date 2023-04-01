import { UserProjectModel, CreateProjectModel, UpdateProjectModel } from "../models/ProjectModel";
import { http } from "./config";

export const getListProjectService = () => {
    return http.get(`api/Project/getAllProject`)
}
export const createNewProjectService = (data: CreateProjectModel) => {
    return http.post(`api/Project/createProjectAuthorize`, data)
}
export const updateUserProjectService = (data: UserProjectModel) => {
    return http.post(`api/Project/assignUserProject`, data)
}
export const removeUserProjectService = (data: UserProjectModel) => {
    return http.post(`api/Project/removeUserFromProject`, data)
}
export const getProjectDetailService = (id: any) => {
    return http.get(`api/Project/getProjectDetail?id=${id}`)
}
export const updateProjectService = (id: number, data: UpdateProjectModel) => {
    return http.put(`api/Project/updateProject?projectId=${id}`, data)
}
export const deleteProjectService = (id: number) => {
    return http.delete(`api/Project/deleteProject?projectId=${id}`)
}
