import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusModel } from '../../models/StatusModel';
import { TaskModel } from '../../models/TaskModel';
import { TaskState } from '../states/TaskState';

const initialState: TaskState = {
    listStatus: [],
    taskDetail: null,
}

const taskReducer = createSlice({
    name: 'taskReducer',
    initialState,
    reducers: {
        getAllStatusReducer: (state: TaskState, action: PayloadAction<StatusModel[]>) => {
            state.listStatus = action.payload
        },
        getTaskDetailReducer: (state: TaskState, action: PayloadAction<TaskModel>) => {
            state.taskDetail = action.payload
        }
    }
});

export const { getAllStatusReducer, getTaskDetailReducer } = taskReducer.actions

export default taskReducer.reducer