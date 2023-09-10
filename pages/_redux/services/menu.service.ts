import axiosConfig from "./axiosConfig";

export const MenuService = {
  getAll() {
    return axiosConfig.get('/menus')
  }
};
