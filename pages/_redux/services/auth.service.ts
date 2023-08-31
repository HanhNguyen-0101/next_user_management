import axiosConfig from "./axiosConfig";

export const AuthService = {
    login() {

    },
    register() {

    },
    getData() {
        return axiosConfig.get(`users`);
    }
}