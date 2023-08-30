import axiosConfig from "./axiosConfig";

export const AuthAPI = {
    login() {

    },
    register() {

    },
    getData() {
        return axiosConfig.get(`posts`);
    }
}