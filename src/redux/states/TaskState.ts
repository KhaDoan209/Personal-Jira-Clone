import { ProjectDetailModel, ProjectModel } from '../../models/ProjectModel';
import { StatusModel } from '../../models/StatusModel';
import { TaskModel } from '../../models/TaskModel';

export type TaskState = {
    listStatus: StatusModel[],
    taskDetail: TaskModel | null
};
