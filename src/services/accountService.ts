import { http } from "./config";
import { FormLoginModel } from "../models/AccountModel";

export const logInService = (data: FormLoginModel) => {
    return http.post(`api/Users/signin`, data)
}