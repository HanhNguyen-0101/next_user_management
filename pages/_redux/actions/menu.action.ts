import { MenuConstant } from "../constants";
import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import { MenuService } from "../services";

const {
  GET_MENU_LIST_SUCCESS, GET_MENU_LIST_FAILUER
} = MenuConstant;

export const MenuAction = {
  getAll: () => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MenuService.getAll();
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_MENU_LIST_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_MENU_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
};
