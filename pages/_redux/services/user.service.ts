import axiosConfig from "./axiosConfig";

export const UserService = {
  getAll() {
    return axiosConfig.get("/users");
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
    return axiosConfig.post(`/users/${id}`, payload);
  },
  deleteItem(id: string) {
    return axiosConfig.delete(`/users/${id}`);
  },
};
