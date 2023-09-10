import { MenuConstant } from "../constants";

const { GET_MENU_LIST_FAILUER, GET_MENU_LIST_SUCCESS } = MenuConstant;

const initState = {
  menuData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  error: null,
};

const menuReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_MENU_LIST_SUCCESS: {
      return { ...state, ...initState, menuData: payload };
    }
    case GET_MENU_LIST_FAILUER: {
      return { ...state, ...initState, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default menuReducer;
