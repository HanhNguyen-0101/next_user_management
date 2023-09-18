import { UserConstant } from "../constants";
import { UserState } from "../models/user";

const {
  GET_USER_LIST_FAILUER,
  GET_USER_LIST_SUCCESS,
  GET_USER_ITEM_SUCCESS,
  GET_USER_ITEM_FAILUER,
  ADD_USER_ITEM_SUCCESS,
  ADD_USER_ITEM_FAILUER,
  EDIT_USER_ITEM_SUCCESS,
  EDIT_USER_ITEM_FAILURE,
  REMOVE_USER_ITEM_SUCCESS,
  REMOVE_USER_ITEM_FAILURE,
} = UserConstant;

const initState: UserState = {
  userData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  user: null,
  error: null,
  query: {},
};

const userReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_USER_LIST_SUCCESS: {
      return { ...state, userData: payload.data, query: payload.query };
    }
    case GET_USER_LIST_FAILUER: {
      return { ...state, error: payload.data };
    }
    case GET_USER_ITEM_SUCCESS: {
      return { ...state, user: payload };
    }
    case GET_USER_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case ADD_USER_ITEM_SUCCESS: {
      return { ...state, user: payload };
    }
    case ADD_USER_ITEM_FAILUER: {
      return { ...state, error: payload.data };
    }
    case EDIT_USER_ITEM_SUCCESS: {
      return { ...state, user: payload };
    }
    case EDIT_USER_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    case REMOVE_USER_ITEM_SUCCESS: {
      return { ...state };
    }
    case REMOVE_USER_ITEM_FAILURE: {
      return { ...state, error: payload.data };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
