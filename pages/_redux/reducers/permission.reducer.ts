import { PermissionConstant } from "../constants";
import { PermissionState } from "../models/permission";

const {
  GET_PERMISSION_LIST_FAILUER,
  GET_PERMISSION_LIST_SUCCESS,
  GET_PERMISSION_ITEM_SUCCESS,
  GET_PERMISSION_ITEM_FAILUER,
  ADD_PERMISSION_ITEM_SUCCESS,
  ADD_PERMISSION_ITEM_FAILUER,
  EDIT_PERMISSION_ITEM_SUCCESS,
  EDIT_PERMISSION_ITEM_FAILURE,
  REMOVE_PERMISSION_ITEM_SUCCESS,
  REMOVE_PERMISSION_ITEM_FAILURE,
} = PermissionConstant;

const initState: PermissionState = {
  permissionData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  permission: null,
  error: null,
  query: {}
};

const permissionReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_PERMISSION_LIST_SUCCESS: {
      return { ...state, permissionData: payload.data, query: payload.query };
    }
    case GET_PERMISSION_LIST_FAILUER: {
      return { ...state, error: payload.data };
    }
    case ADD_PERMISSION_ITEM_SUCCESS: {
      return { ...state, permission: payload };
    }
    case ADD_PERMISSION_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case GET_PERMISSION_ITEM_SUCCESS: {
      return { ...state, permission: payload };
    }
    case GET_PERMISSION_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case REMOVE_PERMISSION_ITEM_SUCCESS: {
      return { ...state };
    }
    case REMOVE_PERMISSION_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    case EDIT_PERMISSION_ITEM_SUCCESS: {
      return { ...state, permission: payload };
    }
    case EDIT_PERMISSION_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default permissionReducer;
