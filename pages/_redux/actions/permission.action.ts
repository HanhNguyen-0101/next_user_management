import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { PermissionConstant } from "../constants";
import { QueryPayload } from "../models/common";
import { PermissionService } from "../services";

const {
  GET_PERMISSION_LIST_SUCCESS,
  GET_PERMISSION_LIST_FAILUER,
  GET_PERMISSION_ITEM_SUCCESS,
  GET_PERMISSION_ITEM_FAILUER,
  ADD_PERMISSION_ITEM_SUCCESS,
  ADD_PERMISSION_ITEM_FAILUER,
  EDIT_PERMISSION_ITEM_SUCCESS,
  EDIT_PERMISSION_ITEM_FAILURE,
  REMOVE_PERMISSION_ITEM_SUCCESS,
  REMOVE_PERMISSION_ITEM_FAILURE,
} = PermissionConstant;

export const PermissionAction = {
  getAll: (query?: QueryPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await PermissionService.getAll(query);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_PERMISSION_LIST_SUCCESS,
            payload: { data, query },
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_PERMISSION_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
};
