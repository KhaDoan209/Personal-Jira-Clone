import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '../states/UserState';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../../models/UserModel';
const initialState: UserState = {
    listUser: [],
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        getListUserReducer: (state: UserState, action: PayloadAction<UserModel[]>) => {
            state.listUser = action.payload
        }
    }
});

export const { getListUserReducer } = userReducer.actions

export default userReducer.reducer