import { LoginPayload } from "pages/_models/login";
import { AuthConstant } from "../constants";
import { AuthService } from "../services";

const {GET_DATA, LOGIN_SUCCESS} = AuthConstant;

export const AuthType = {
  getData: (payload: any): any => ({
    type: GET_DATA,
    payload,
  }),
  loginSuccess: (payload: any) => ({
    type: LOGIN_SUCCESS,
    payload,
  }) 
}

export const AuthAction = {
  getDataService: () => {
    return async (dispatch: any) => {
      try {
        const data = await AuthService.getData();
        dispatch(AuthType.getData(data));
      } catch (error) {
        console.log(error);
      }
    };
  },
  login: (payload: LoginPayload) => {
    return async (dispatch: any) => {
      try {
        const data = await AuthService.login(payload);
        dispatch(AuthType.loginSuccess(data));
      } catch (error) {
        console.log(error);
      }
    };
  }
}
