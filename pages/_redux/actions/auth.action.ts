import { LoginPayload } from "@/redux/models/auth";
import { AuthConstant } from "../constants";
import { AuthService } from "../services";
import { STATUS_CODE } from "@/constants/configSetting";

const { LOGIN_SUCCESS, LOGIN_FAILUER, LOGIN_GOOGLE_SUCCESS, LOGIN_GOOGLE_FAILUER } = AuthConstant;

export const AuthType = {
  loginSuccess: (payload: any) => ({
    type: LOGIN_SUCCESS,
    payload,
  }),
  loginFailue: (payload: any) => ({
    type: LOGIN_FAILUER,
    payload,
  }),
  loginGoogleSuccess: (payload: any) => ({
    type: LOGIN_GOOGLE_SUCCESS,
    payload,
  }),
  loginGoogleFailue: (payload: any) => ({
    type: LOGIN_GOOGLE_FAILUER,
    payload,
  }),
};

export const AuthAction = {
  login: (payload: LoginPayload) => {
    return async (dispatch: any) => {
      try {
        const result = await AuthService.login(payload);
        const { status, data } = result;
        if (status === STATUS_CODE.SUCCESS) {
          dispatch(AuthType.loginSuccess(data));
        }
      } catch (error) {
        dispatch(AuthType.loginFailue(error));
      }
    };
  },
  loginGoogle: () => {
    return async (dispatch: any) => {
      try {
        const result = await AuthService.loginGoogle();
        const { status, data } = result;
        if (status === STATUS_CODE.SUCCESS) {
          dispatch(AuthType.loginSuccess(data));
        }
      } catch (error) {
        dispatch(AuthType.loginFailue(error));
      }
    };
  },
};
