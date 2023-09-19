import { RolePermissionConstant } from "../constants";
import { RolePermissionState } from "../models/rolePermission";

const {
  ADD_ROLE_PERMISSION_ITEM_SUCCESS,
  ADD_ROLE_PERMISSION_ITEM_FAILUER,
  REMOVE_ROLE_PERMISSION_ITEM_FAILURE,
} = RolePermissionConstant;

const initState: RolePermissionState = {
  rolePermission: null,
  error: null,
};

const rolePermissionReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case ADD_ROLE_PERMISSION_ITEM_SUCCESS: {
      return { ...state, rolePermission: payload };
    }
    case ADD_ROLE_PERMISSION_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case REMOVE_ROLE_PERMISSION_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default rolePermissionReducer;
