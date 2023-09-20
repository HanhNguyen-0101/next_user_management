import axiosConfig from "./axiosConfig";
import { QueryPayload } from "../models/common";
import { ITEM_PER_PAGE } from "pages/_utils/constant";

export const MenuService = {
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
    return axiosConfig.get(`/menus${queryStr}`);
  },
  getItemById(id: string) {
    return axiosConfig.get(`/menus/${id}`);
  },
  addItem(payload: any) {
    return axiosConfig.post("/menus", payload);
  },
  updateItem(id: string, payload: any) {
    return axiosConfig.put(`/menus/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/menus/${id}`);
  },
};
