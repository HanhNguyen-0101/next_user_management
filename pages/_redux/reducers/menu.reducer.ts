import { MenuConstant } from "../constants";
import { MenuState } from "../models/menu";

const {
  GET_MENU_LIST_FAILUER,
  GET_MENU_LIST_SUCCESS,
  ADD_MENU_ITEM_SUCCESS,
  ADD_MENU_ITEM_FAILUER,
  EDIT_MENU_ITEM_SUCCESS,
  EDIT_MENU_ITEM_FAILURE,
  REMOVE_MENU_ITEM_SUCCESS,
  REMOVE_MENU_ITEM_FAILURE,
  GET_MENU_ITEM_SUCCESS,
  GET_MENU_ITEM_FAILUER,
} = MenuConstant;

const initState: MenuState = {
  menuData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  menuDataList: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  menu: null,
  error: null,
  query: {},
};

const menuReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_MENU_LIST_SUCCESS: {
      return { ...state, menuData: payload?.data?.menuData, menuDataList: payload?.data?.menuDataList, query: payload.query };
    }
    case GET_MENU_LIST_FAILUER: {
      return { ...state, error: payload?.data };
    }
    case ADD_MENU_ITEM_SUCCESS: {
      return { ...state, menu: payload };
    }
    case ADD_MENU_ITEM_FAILUER: {
      return { ...state, error: payload?.data };
    }
    case GET_MENU_ITEM_SUCCESS: {
      return { ...state, menu: payload };
    }
    case GET_MENU_ITEM_FAILUER: {
      return { ...state, error: payload?.data };
    }
    case EDIT_MENU_ITEM_SUCCESS: {
      return { ...state, menu: payload };
    }
    case EDIT_MENU_ITEM_FAILURE: {
      return { ...state, error: payload?.data };
    }
    case REMOVE_MENU_ITEM_SUCCESS: {
      return { ...state };
    }
    case REMOVE_MENU_ITEM_FAILURE: {
      return { ...state, error: payload?.data };
    }
    default:
      return { ...state };
  }
};

export default menuReducer;
