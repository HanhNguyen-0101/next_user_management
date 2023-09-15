import { ITEM_PER_PAGE } from "pages/_utils/constant";
import axiosConfig from "./axiosConfig";

export const UserService = {
  getAll(query: any) {
    const page = query && query.page ? query.page : 1;
    return axiosConfig.get(`/users?page=${page}&item_per_page=${ITEM_PER_PAGE}`);
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
