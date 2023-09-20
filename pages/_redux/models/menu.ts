import { QueryPayload } from "./common";

export interface IMenuModel {
  id?: string,
  name: string,
  createdAt?: string,
  updatedAt?: string,
  key: string,
  parentId?: string,
  parentMenu?: IMenuModel,
}
export interface IMenuArrayModel {
  data: Array<IMenuModel>;
}

export interface MenuState {
  menuData?: {
    currentPage: number;
    data: Array<IMenuModel>;
    nextPage: number;
    prevPage: number;
    total: number;
  } | null;
  menuDataList?: {
    currentPage: number;
    data: Array<IMenuModel>;
    nextPage: number;
    prevPage: number;
    total: number;
  } | null;
  error?: string | null;
  menu?: IMenuModel | null;
  query?: QueryPayload;
}

export interface AddMenuPayload {
  name: string;
  key: string;
  parentId: string;
}

export interface GetMenuByIdPayload {
  id: string;
}
export interface GetMenuResponse {
  data: IMenuModel;
  status: number;
}
export interface EditMenuPayload {
  id: string;
  data: {
    name: string;
    key: string;
    parentId: string;
  };
}
export interface DeleteMenuResponse {
  data: string;
  status: number;
}

