import { LoginPayload } from "pages/_models/login";
import axiosConfig from "./axiosConfig";

export const AuthService = {
    login(payload: LoginPayload) {
        return axiosConfig.post('auth/login', payload);
    },
    register() {

    },
    getData() {
        return axiosConfig.get(`users`);
    }
}