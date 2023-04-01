import { UserModel } from "../../models/UserModel";
import { getListUserService } from "../../services/userService";
import { alertToast } from "../../utils/alert";
import { DispatchType } from "../configStore";
import { PayloadAction } from "@reduxjs/toolkit";
import { getListUserReducer } from "../reducer/userReducer";
export const getListUserAction = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await getListUserService()
            const content: UserModel[] = result.data.content
            const action: PayloadAction<UserModel[]> = getListUserReducer(content)
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}