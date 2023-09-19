import { IPermissionModel } from "./permission";
import { IRoleModel } from "./role";

export interface IRolePermissionModel {
  permissionId?: string,
  roleId?: string;
  permission?: IPermissionModel | null;
  role?: IRoleModel | null;
}

export interface RolePermissionState {
  error?: string | null;
  rolePermission?: IRolePermissionModel | null;
}

export interface AddRolePermissionPayload {
  permissionId: string,
  roleId: string,
}

export interface DeleteRolePermissionPayload {
  permissionId: string,
  roleId: string,
}

export interface DeleteRolePermissionResponse {
  data: string;
  status: number;
}
