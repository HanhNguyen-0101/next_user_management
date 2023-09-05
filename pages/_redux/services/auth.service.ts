import { LoginPayload } from "pages/_models/login";
import axiosConfig from "./axiosConfig";

export const AuthService = {
    login(payload: LoginPayload) {
        console.log('*********', payload);
        return {
            access_token: 'hello'
        }
        // return axiosConfig.post('auth/login', payload);
    },
    register() {

    },
    getData() {
        return axiosConfig.get(`users`);
    }
}