import { ProjectDetailModel, ProjectModel } from '../../models/ProjectModel';

export type ProjectState = {
   listProject: ProjectModel[],
   projectDetail: ProjectDetailModel | null;
};
