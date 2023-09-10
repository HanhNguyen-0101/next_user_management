import { LoginPayload, RegisterPayload } from "@/redux/models/auth";
import { AuthConstant } from "../constants";
import { AuthService } from "../services";
import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";

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
  login: (payload: LoginPayload, setSubmitting: Function) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await AuthService.login(payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        let message = error.response.data.message;
        if (error.response.status === STATUS_CODE.BAD_REQUEST) {
          message = "Email or Password is wrong!";
        }
        dispatch({
          type: LOGIN_FAILUER,
          payload: { message },
        });
        setSubmitting(false);
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
      } catch (error) {
        dispatch({
          type: REGISTER_FAILUER,
          payload: error,
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
      } catch (error) {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: error,
        });
      }
    };
  },
};
