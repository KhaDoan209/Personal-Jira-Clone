import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignedInAccountModel } from '../../models/AccountModel';
import { AccountState } from '../states/AccountState';
import { ACCESS_TOKEN, USER_LOGIN } from '../../utils/setting';

const initialState: AccountState = {
    signedInAccount: JSON.parse(localStorage.getItem(USER_LOGIN) || '{}')
}

const accountReducer = createSlice({
    name: 'accountReducer',
    initialState,
    reducers: {
        loginReducer: (state: AccountState, action: PayloadAction<SignedInAccountModel>) => {
            state.signedInAccount = action.payload
        },
    }
});

export const { loginReducer } = accountReducer.actions

export default accountReducer.reducer