import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { PermissionGroupConstant } from "../constants";
import { QueryPayload } from "../models/common";
import { PermissionGroupService } from "../services";

const { GET_PERMISSION_GROUP_LIST_SUCCESS, GET_PERMISSION_GROUP_LIST_FAILUER } =
  PermissionGroupConstant;

export const PermissionGroupAction = {
  getAll: (query?: QueryPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await PermissionGroupService.getAll(query);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_PERMISSION_GROUP_LIST_SUCCESS,
            payload: { data, query },
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_PERMISSION_GROUP_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
};
