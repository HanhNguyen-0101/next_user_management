import { RoleConstant } from "../constants";
import { RoleState } from "../models/role";

const {
  GET_ROLE_LIST_FAILUER,
  GET_ROLE_LIST_SUCCESS,
  GET_ROLE_ITEM_SUCCESS,
  GET_ROLE_ITEM_FAILUER,
  ADD_ROLE_ITEM_SUCCESS,
  ADD_ROLE_ITEM_FAILUER,
  EDIT_ROLE_ITEM_SUCCESS,
  EDIT_ROLE_ITEM_FAILURE,
  REMOVE_ROLE_ITEM_SUCCESS,
  REMOVE_ROLE_ITEM_FAILURE,
} = RoleConstant;

const initState: RoleState = {
  roleData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  role: null,
  error: null,
};

const roleReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_ROLE_LIST_SUCCESS: {
      return { ...state, roleData: payload.data };
    }
    case GET_ROLE_LIST_FAILUER: {
      return { ...state, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default roleReducer;
