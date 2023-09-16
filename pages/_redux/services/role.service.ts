import { ITEM_PER_PAGE } from "pages/_utils/constant";
import axiosConfig from "./axiosConfig";

export const RoleService = {
  getAll(query: any) {
    let queryStr = '';
    if (query) {
      queryStr = '?';
      if(query.page) {
        queryStr += `page=${query.page}&item_per_page=${ITEM_PER_PAGE}`;
      }
    }
    return axiosConfig.get(`/roles${queryStr}`);
  },
  getItemById(id: string) {
    return axiosConfig.get(`/roles/${id}`);
  },
  getItemByName(name: string) {
    return axiosConfig.get(`/roles/name/${name}`);
  },
  addItem(payload: any) {
    return axiosConfig.post("/roles", payload);
  },
  updateItem(id: string, payload: any) {
    return axiosConfig.put(`/roles/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/roles/${id}`);
  },
};
