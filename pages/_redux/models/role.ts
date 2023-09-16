import { IUserModel } from "./user";

export interface IRoleModel {
  id?: string,
  name: string;
  createdAt?: string;
  updatedAt?: string;
  createBy?: string;
  updatedBy?: string;
  description?: string;
  updatedByRole?: IUserModel | null;
  createdByRole?: IUserModel | null;
  userRoles?: Array<IUserModel> | null;
  rolePermissions?: [] | null;
}
export interface IRoleArrayModel {
  data: Array<IRoleModel>;
}

export interface RoleState {
  roleData?: {
    currentPage: number,
    data: Array<IRoleModel>,
    nextPage: number,
    prevPage: number,
    total: number,
  } | null;
  error?: string | null;
  role?: IRoleModel | null;
  currentPage?: number | 1;
}

export interface GetRoleByIdPayload {
  id: string
}
export interface GetRoleResponse {
  data: IRoleModel;
  status: number;
}

export interface DeleteRoleByIdPayload {
  id: string,
  page?: number | 1,
}
export interface DeleteRoleResponse {
  data: string;
  status: number;
}
