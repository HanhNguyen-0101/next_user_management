import axiosConfig from "./axiosConfig";
import { AddRolePermissionPayload, DeleteRolePermissionPayload } from "../models/rolePermission";

export const RolePermissionService = {
  addItem(payload: AddRolePermissionPayload) {
    return axiosConfig.post("/role-permissions", payload);
  },
  deleteItem(payload: DeleteRolePermissionPayload) {
    return axiosConfig.delete(`/role-permissions/${payload.roleId}/${payload.permissionId}`);
  },
};
