import { LoginPayload, RegisterPayload } from "@/redux/models/auth";
import axiosConfig from "./axiosConfig";

export const AuthService = {
  login(payload: LoginPayload) {
    return axiosConfig.post("auth/login", payload);
  },
  register(payload: RegisterPayload) {
    return axiosConfig.post("auth/register", payload);
  },
  loginGoogle(payload: any) {
    return axiosConfig.post("auth/google-nextauth/login", payload);
  },
  logout() {
    return axiosConfig.post("/auth/logout");
  },
  updateProfile(id: string, payload: any) {
    return axiosConfig.put(`/users/personal/${id}`, payload);
  },
  deleteProfile(id: string) {
    return axiosConfig.delete(`/users/personal/${id}`);
  },
  resetPassword(email: string) {
    return axiosConfig.get(`/auth/forget-password/${email}`);
  }
};
