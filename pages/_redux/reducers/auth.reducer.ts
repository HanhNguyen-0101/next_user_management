import { USER_LOGIN } from "@/constants/configSetting";
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

let user = null;
if (typeof window !== "undefined") {
  const userLocal = localStorage.getItem(USER_LOGIN);
  if (userLocal) {
    user = JSON.parse(userLocal);
  }
}

const initState = {
  error: null,
  profile: user,
  user: null,
};

const authReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(payload.profile));
      return {
        ...state,
        profile: payload.profile,
        error: initState.error
      };
    }
    case LOGIN_FAILUER: {
      localStorage.removeItem(USER_LOGIN);
      return { ...state, profile: null, error: payload.message, user: initState.user };
    }
    case LOGIN_GOOGLE_SUCCESS: {
      return { ...state, user: payload.user, error: initState.error };
    }
    case LOGIN_GOOGLE_FAILUER: {
      return { ...state, error: payload.message };
    }
    case REGISTER_SUCCESS: {
      return { ...state, user: payload, error: initState.error };
    }
    case REGISTER_FAILUER: {
      return {
        ...state,
        error: payload?.response?.data.message,
      };
    }
    case LOGOUT_SUCCESS:
      localStorage.removeItem(USER_LOGIN);
      return { ...state, profile: null };
    case LOGOUT_FAILURE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default authReducer;
