import { ITEM_PER_PAGE } from "pages/_utils/constant";
import axiosConfig from "./axiosConfig";
import { QueryPayload } from "../models/common";

export const PermissionGroupService = {
  getAll(query?: QueryPayload) {
    let queryStr = '';
    if (query) {
      queryStr = '?';
      if(query.page) {
        queryStr += `page=${query.page}&item_per_page=${ITEM_PER_PAGE}&`;
      }
      if(query.search) {
        queryStr += `search=${query.search}`;
      }
    }
    return axiosConfig.get(`/permission-groups${queryStr}`);
  },
  getItemById(id: string) {
    return axiosConfig.get(`/permission-groups/${id}`);
  },
  getItemByName(name: string) {
    return axiosConfig.get(`/permission-groups/name/${name}`);
  },
  addItem(payload: any) {
    return axiosConfig.post("/permission-groups", payload);
  },
  updateItem(id: string, payload: any) {
    return axiosConfig.put(`/permission-groups/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/permission-groups/${id}`);
  },
};
