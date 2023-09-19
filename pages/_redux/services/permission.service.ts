import { ITEM_PER_PAGE } from "pages/_utils/constant";
import axiosConfig from "./axiosConfig";
import { QueryPayload } from "../models/common";

export const PermissionService = {
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
    return axiosConfig.get(`/permissions${queryStr}`);
  },
  getItemById(id: string) {
    return axiosConfig.get(`/permissions/${id}`);
  },
  getItemByName(name: string) {
    return axiosConfig.get(`/permissions/name/${name}`);
  },
  addItem(payload: any) {
    return axiosConfig.post("/permissions", payload);
  },
  updateItem(id: string, payload: any) {
    return axiosConfig.put(`/permissions/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/permissions/${id}`);
  },
};
