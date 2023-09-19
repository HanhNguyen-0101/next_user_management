import { QueryPayload } from "./common";
import { IPermissionGroupModel } from "./permissionGroup";
import { IRoleModel } from "./role";

export interface IPermissionModel {
  id?: string,
  name: string,
  createdAt?: String,
  description?: string,
  updatedAt?: string,
  code?: string,
  permissionGroupId?: string,
  rolePermissions?: Array<IRoleModel>,
  permissionGroup?: IPermissionGroupModel,
}
export interface IPermissionArrayModel {
  data: Array<IPermissionModel>;
}

export interface PermissionState {
  permissionData?: {
    currentPage: number,
    data: Array<IPermissionModel>,
    nextPage: number,
    prevPage: number,
    total: number,
  } | null;
  error?: string | null;
  permission?: IPermissionModel | null;
  query?: QueryPayload;
}

export interface AddPermissionPayload {
  name: string;
  description?: string;
  code?: string;
  permissionGroupId: string,
}

export interface EditPermissionPayload {
  id: string;
  data: {
    name: string;
    description?: string;
    code?: string;
    permissionGroupId: string;
  };
}

export interface GetPermissionByIdPayload {
  id: string
}
export interface GetPermissionResponse {
  data: IPermissionModel;
  status: number;
}

export interface DeletePermissionByIdPayload {
  id: string,
}
export interface DeletePermissionResponse {
  data: string;
  status: number;
}
