export type ProjectModel = {
    members: Member[];
    creator: Creator;
    id: number;
    projectName: string;
    description: string;
    categoryId: number;
    categoryName: string;
    alias: string;
    deleted: boolean;
};

export type Creator = {
    id: number;
    name: string;
}
export type Member = {
    userId: number;
    name: string;
    avatar: string;
}

export type LstTask = {
    lstTaskDeTail: LstTaskDeTail[];
    statusId: string;
    statusName: string;
    alias: string;
}

export type LstTaskDeTail = {
    priorityTask: PriorityTask;
    taskTypeDetail: TaskTypeDetail;
    assigness: Assigness[];
    lstComment: LstComment[];
    taskId: number;
    taskName: string;
    alias: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    typeId: number;
    priorityId: number;
    projectId: number;
}

export type Assigness = {
    id: number;
    avatar: string;
    name: string;
    alias: string;
}

export type LstComment = {
    id: number;
    idUser: number;
    name: string;
    avatar: string;
    commentContent: string;
}

export type PriorityTask = {
    priorityId: number;
    priority: string;
}

export type TaskTypeDetail = {
    id: number;
    taskType: string;
}


export type CreateProjectModel = {
    projectName: string | null,
    description: string | null,
    categoryId: number | null,
    alias: string | null
}

export type ProjectDetailModel = {
    lstTask: LstTask[];
    members: Member[];
    creator: Creator;
    id: number;
    projectName: string;
    description: string;
    projectCategory: Creator;
    alias: string;
}

export type UpdateProjectModel = {
    id: number | any;
    projectName: string | any;
    creator: number | any;
    description: string | any;
    categoryId: number | any;
}


export type UserProjectModel = {
    projectId: number | any;
    userId: number | any;
}