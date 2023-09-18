import { ITEM_PER_PAGE } from "pages/_utils/constant";
import axiosConfig from "./axiosConfig";
import { QueryPayload } from "../models/common";

export const UserService = {
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
    return axiosConfig.get(`/users${queryStr}`);
  },
  getItemById(id: string) {
    return axiosConfig.get(`/users/${id}`);
  },
  getItemByEmail(email: string) {
    return axiosConfig.get(`/users/email/${email}`);
  },
  addItem(payload: any) {
    return axiosConfig.post("/users", payload);
  },
  updateItem(id: string, payload: any) {
    return axiosConfig.put(`/users/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/users/${id}`);
  },
};
