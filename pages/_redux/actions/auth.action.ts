import { LoginPayload, RegisterPayload } from "@/redux/models/auth";
import { AuthConstant } from "../constants";
import { AuthService, UserService } from "../services";
import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import Router from "next/router";

const {
  LOGIN_SUCCESS,
  LOGIN_FAILUER,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILUER,
  REGISTER_FAILUER,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} = AuthConstant;

export const AuthAction = {
  login: (payload: LoginPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await AuthService.login(payload);
        if (status === STATUS_CODE.SUCCESS) {
          const user = await UserService.getItemById(data.profile.id);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: user.data,
          });
        }
        Router.push('/dashboard');
      } catch (error: any) {
        const message = error?.response?.data.message;
        dispatch({
          type: LOGIN_FAILUER,
          payload: { message },
        });
      }
    };
  },
  loginGoogle: () => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await AuthService.loginGoogle();
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: LOGIN_GOOGLE_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: LOGIN_GOOGLE_FAILUER,
          payload: error,
        });
      }
    };
  },
  register: (payload: RegisterPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await AuthService.register(payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
          });
        }
        Router.push('/login');
      } catch (error: any) {
        const message = error?.response?.data.message;
        dispatch({
          type: REGISTER_FAILUER,
          payload: { message },
        });
      }
    };
  },
  logout: () => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status } = await AuthService.logout();
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        }
        Router.push('/login')
      } catch (error) {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: error,
        });
      }
    };
  },
};
