import { AuthConstant } from "../constants";

const {
  LOGIN_SUCCESS,
  LOGIN_FAILUER,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILUER,
  REGISTER_FAILUER,
  REGISTER_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} = AuthConstant;

const initState = {
  msg: "",
  error: "",
  user: null,
};

const authReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      return { ...state, msg: payload.message, error: initState.error };
    }
    case LOGIN_FAILUER: {
      return { ...state, error: payload.message, msg: initState.msg };
    }
    case LOGIN_GOOGLE_SUCCESS: {
      return { ...state, user: payload.user, error: initState.error };
    }
    case LOGIN_GOOGLE_FAILUER: {
      return { ...state, error: payload.message, msg: initState.msg };
    }
    case REGISTER_SUCCESS: {
      return { ...state, user: payload, error: initState.error };
    }
    case REGISTER_FAILUER: {
      return {
        ...state,
        error: payload?.response?.data.message,
        msg: initState.msg,
      };
    }
    case LOGOUT_SUCCESS:
      return { ...state };
    case LOGOUT_FAILURE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default authReducer;
