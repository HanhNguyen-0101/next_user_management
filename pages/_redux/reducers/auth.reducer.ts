import { AuthConstant } from "../constants";

const { LOGIN_SUCCESS, LOGIN_FAILUER, LOGIN_GOOGLE_SUCCESS, LOGIN_GOOGLE_FAILUER, REGISTER_FAILUER, REGISTER_SUCCESS } = AuthConstant;

const initState = {
  msg: "",
  error: "",
  user: null,
};
const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, msg: action.payload.message, error: initState.error };
    }
    case LOGIN_FAILUER: {
      return { ...state, error: action.payload.message, msg: initState.msg };
    }
    case LOGIN_GOOGLE_SUCCESS: {
      return { ...state, user: action.payload.user, error: initState.error };
    }
    case LOGIN_GOOGLE_FAILUER: {
      return { ...state, error: action.payload.message, msg: initState.msg };
    }
    case REGISTER_SUCCESS: {
      return { ...state, user: action.payload, error: initState.error };
    }
    case REGISTER_FAILUER: {
      return { ...state, error: action.payload?.response?.data.message, msg: initState.msg };
    }
    default:
      return { ...state };
  }
};

export default authReducer;
