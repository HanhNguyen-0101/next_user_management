import { ITEM_PER_PAGE } from "pages/_utils/constant";
import axiosConfig from "./axiosConfig";
import { QueryPayload } from "../models/common";

export const MdmVslCntrService = {
  getAll(query?: QueryPayload) {
    let queryStr = '';
    if (query) {
      queryStr = '?';
      if(query.page) {
        queryStr += `page=${query.page}&item_per_page=${query.item_per_page ? query.item_per_page : ITEM_PER_PAGE}&`;
      }
      if(query.search) {
        queryStr += `search=${query.search}`;
      }
    }
    return axiosConfig.get(`/mdm-vsl-cntr${queryStr}`);
  },
  getItemById(id: string) {
    return axiosConfig.get(`/mdm-vsl-cntr/${id}`);
  },
  addItem(payload: any) {
    return axiosConfig.post("/mdm-vsl-cntr", payload);
  },
  updateItem(id: string, payload: any) {
    return axiosConfig.put(`/mdm-vsl-cntr/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/mdm-vsl-cntr/${id}`);
  },
};
