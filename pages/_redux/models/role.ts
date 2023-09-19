import { QueryPayload } from "./common";
import { IUserModel } from "./user";

export interface IRoleModel {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  createBy?: string;
  updatedBy?: string;
  description?: string;
  updatedByUser?: IUserModel | null;
  createdByUser?: IUserModel | null;
  userRoles?: Array<IUserModel> | null;
  rolePermissions?: [] | null;
}
export interface IRoleArrayModel {
  data: Array<IRoleModel>;
}

export interface RoleState {
  roleData?: {
    currentPage: number;
    data: Array<IRoleModel>;
    nextPage: number;
    prevPage: number;
    total: number;
  } | null;
  error?: string | null;
  role?: IRoleModel | null;
  query?: QueryPayload;
}

export interface GetRoleByIdPayload {
  id: string;
}
export interface GetRoleResponse {
  data: IRoleModel;
  status: number;
}

export interface AddRolePayload {
  name: string;
  description?: string;
}

export interface EditRolePayload {
  id: string;
  data: {
    name: string;
    description?: string;
  };
}

export interface DeleteRoleResponse {
  data: string;
  status: number;
}
