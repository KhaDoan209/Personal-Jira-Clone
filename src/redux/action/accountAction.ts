import { FormLoginModel, SignedInAccountModel } from "../../models/AccountModel"
import { logInService } from "../../services/accountService";
import { DispatchType } from "../configStore";
import { PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, USER_LOGIN } from "../../utils/setting";
import { NavigateFunction } from "react-router-dom";
import { loginReducer } from "../reducer/accountReducer";


export const loginAction = (data: FormLoginModel, navigate: NavigateFunction) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await logInService(data)
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken);
            const content: SignedInAccountModel = result.data.content
            alert('Đăng nhập thành công')
            navigate('/')
            const action: PayloadAction<SignedInAccountModel> = loginReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    };
}

export const logoutAction = (navigate: NavigateFunction) => {
    return (dispatch: DispatchType) => {
        try {
            localStorage.removeItem(USER_LOGIN)
            localStorage.removeItem(ACCESS_TOKEN);

            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
}