import { http } from "./config"
export const getListUserService = () => {
    return http.get(`api/Users/getUser`)
}