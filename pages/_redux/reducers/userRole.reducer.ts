import { UserRoleConstant } from "../constants";
import { UserRoleState } from "../models/userRole";

const {
  GET_USER_ROLE_LIST_FAILUER,
  GET_USER_ROLE_LIST_SUCCESS,
  GET_USER_ROLE_ITEM_SUCCESS,
  GET_USER_ROLE_ITEM_FAILUER,
  ADD_USER_ROLE_ITEM_SUCCESS,
  ADD_USER_ROLE_ITEM_FAILUER,
  EDIT_USER_ROLE_ITEM_SUCCESS,
  EDIT_USER_ROLE_ITEM_FAILURE,
  REMOVE_USER_ROLE_ITEM_SUCCESS,
  REMOVE_USER_ROLE_ITEM_FAILURE,
} = UserRoleConstant;

const initState: UserRoleState = {
  userRole: null,
  error: null,
};

const userRoleReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case ADD_USER_ROLE_ITEM_SUCCESS: {
      return { ...state, userRole: payload };
    }
    case ADD_USER_ROLE_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case REMOVE_USER_ROLE_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default userRoleReducer;
