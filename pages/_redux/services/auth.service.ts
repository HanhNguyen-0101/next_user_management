import { LoginPayload, RegisterPayload } from "@/redux/models/auth";
import axiosConfig from "./axiosConfig";

export const AuthService = {
  login(payload: LoginPayload) {
    return axiosConfig.post("auth/login", payload);
  },
  register(payload: RegisterPayload) {
    return axiosConfig.post("auth/register", payload);
  },
  loginGoogle() {
    return axiosConfig.get("auth/google/login", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  },
};
