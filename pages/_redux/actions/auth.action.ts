import { AuthConstant } from "../constants";
import { AuthService } from "../services";

export const AuthType = {
  getData: (payload: any): any => ({
    type: AuthConstant.GET_DATA,
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
  }
}
