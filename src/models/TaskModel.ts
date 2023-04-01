
export type CreateTaskModel = {
    listUserAsign: number[] | any;
    taskName: string | any;
    description: string | any;
    statusId: string | any;
    originalEstimate: number | any;
    timeTrackingSpent: number | any;
    timeTrackingRemaining: number | any;
    projectId: number | any;
    typeId: number | any;
    priorityId: number | any;
    taskId?: number | any
}
export type TaskModel = {
    priorityTask: PriorityTask;
    taskTypeDetail: TaskTypeDetail;
    assigness: Assigness[];
    lstComment: any[];
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

export type PriorityTask = {
    priorityId: number;
    priority: string;
}

export type TaskTypeDetail = {
    id: number;
    taskType: string;
}
