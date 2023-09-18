import axiosConfig from "./axiosConfig";
import { AddUserRolePayload, DeleteUserRolePayload } from "../models/userRole";

export const UserRoleService = {
  addItem(payload: AddUserRolePayload) {
    return axiosConfig.post("/user-roles", payload);
  },
  deleteItem(payload: DeleteUserRolePayload) {
    return axiosConfig.delete(`/user-roles/${payload.userId}/${payload.roleId}`);
  },
};
