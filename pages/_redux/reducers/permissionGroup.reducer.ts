import { PermissionGroupConstant } from "../constants";
import { PermissionGroupState } from "../models/permissionGroup";

const {
  GET_PERMISSION_GROUP_LIST_FAILUER,
  GET_PERMISSION_GROUP_LIST_SUCCESS,
  GET_PERMISSION_GROUP_ITEM_SUCCESS,
  GET_PERMISSION_GROUP_ITEM_FAILUER,
  ADD_PERMISSION_GROUP_ITEM_SUCCESS,
  ADD_PERMISSION_GROUP_ITEM_FAILUER,
  EDIT_PERMISSION_GROUP_ITEM_SUCCESS,
  EDIT_PERMISSION_GROUP_ITEM_FAILURE,
  REMOVE_PERMISSION_GROUP_ITEM_SUCCESS,
  REMOVE_PERMISSION_GROUP_ITEM_FAILURE,
} = PermissionGroupConstant;

const initState: PermissionGroupState = {
  permissionGroupData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  permissionGroup: null,
  error: null,
  query: {}
};

const permissionGroupReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_PERMISSION_GROUP_LIST_SUCCESS: {
      return { ...state, permissionGroupData: payload.data, query: payload.query };
    }
    case GET_PERMISSION_GROUP_LIST_FAILUER: {
      return { ...state, error: payload.data };
    }
    case ADD_PERMISSION_GROUP_ITEM_SUCCESS: {
      return { ...state, permissionGroup: payload };
    }
    case ADD_PERMISSION_GROUP_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case GET_PERMISSION_GROUP_ITEM_SUCCESS: {
      return { ...state, permissionGroup: payload };
    }
    case GET_PERMISSION_GROUP_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case REMOVE_PERMISSION_GROUP_ITEM_SUCCESS: {
      return { ...state };
    }
    case REMOVE_PERMISSION_GROUP_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    case EDIT_PERMISSION_GROUP_ITEM_SUCCESS: {
      return { ...state, permissionGroup: payload };
    }
    case EDIT_PERMISSION_GROUP_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default permissionGroupReducer;
