import { LoginPayload, RegisterPayload } from "@/redux/models/auth";
import { AuthConstant } from "../constants";
import { AuthService, UserService } from "../services";
import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import Router from "next/router";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { ModalAction } from ".";

const {
  LOGIN_SUCCESS,
  LOGIN_FAILUER,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILUER,
  REGISTER_FAILUER,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_SUCCESS,
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
        Router.push("/dashboard");
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
        Router.push("/login");
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
        Router.push("/login");
      } catch (error) {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: error,
        });
      }
    };
  },
  editProfile: (id: string, payload: any) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserService.updateItem(id, payload);
        if (status === STATUS_CODE.SUCCESS) {
          const user = await UserService.getItemById(data.id);
          dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: user.data,
          });
          openNotification(
            NOTIF_TYPE.SUCCESS,
            "Profile is updated successfully!"
          );
          dispatch(ModalAction.hideModal());
        }
      } catch (error: any) {
        const message = error?.response?.data.message;
        dispatch({
          type: EDIT_PROFILE_FAILURE,
          payload: { message },
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
};
