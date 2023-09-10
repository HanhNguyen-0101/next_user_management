import { number } from "react-i18next/icu.macro";

export interface Menu {
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  key: string,
  parentId: string,
  parentMenu: Object,
}

export type MenuType = Menu;

export interface MenuList {
  currentPage: number,
  data: Array<Menu>,
  nextPage: number,
  prevPage: number,
  total: number,
}

export type MenuListType = MenuList;
