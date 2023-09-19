import { QueryPayload } from "./common";

export interface IPermissionGroupModel {
  id?: string,
  name: string,
  createdAt?: String,
  updatedAt?: string,
}
export interface IPermissionGroupArrayModel {
  data: Array<IPermissionGroupModel>;
}

export interface PermissionGroupState {
  permissionGroupData?: {
    currentPage: number,
    data: Array<IPermissionGroupModel>,
    nextPage: number,
    prevPage: number,
    total: number,
  } | null;
  error?: string | null;
  permissionGroup?: IPermissionGroupModel | null;
  query?: QueryPayload;
}

export interface GetPermissionGroupByIdPayload {
  id: string
}
export interface GetPermissionGroupResponse {
  data: IPermissionGroupModel;
  status: number;
}

export interface DeletePermissionGroupByIdPayload {
  id: string,
}
export interface DeletePermissionGroupResponse {
  data: string;
  status: number;
}
