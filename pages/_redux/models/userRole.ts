import { IRoleModel } from "./role";
import { IUserModel } from "./user";

export interface IUserRoleModel {
  userId?: string,
  roleId?: string;
  assignedAt?: string;
  user?: IUserModel | null;
  role?: IRoleModel | null;
}

export interface UserRoleState {
  error?: string | null;
  userRole?: IUserRoleModel | null;
}

export interface AddUserRolePayload {
  userId: string,
  roleId: string,
}

export interface DeleteUserRolePayload {
  userId: string,
  roleId: string,
}
export interface DeleteUserRoleResponse {
  data: string;
  status: number;
}
