import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { RolePermissionConstant } from "../constants";
import { AddRolePermissionPayload, DeleteRolePermissionPayload, DeleteRolePermissionResponse } from "../models/rolePermission";
import { RolePermissionService } from "../services";

const {
  ADD_ROLE_PERMISSION_ITEM_SUCCESS,
  ADD_ROLE_PERMISSION_ITEM_FAILUER,
  REMOVE_ROLE_PERMISSION_ITEM_SUCCESS,
  REMOVE_ROLE_PERMISSION_ITEM_FAILURE,
} = RolePermissionConstant;

export const RolePermissionAction = {
  addItem: (payload: AddRolePermissionPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await RolePermissionService.addItem(payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_ROLE_PERMISSION_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: ADD_ROLE_PERMISSION_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  removeItem: (values: DeleteRolePermissionPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status }: DeleteRolePermissionResponse =
          await RolePermissionService.deleteItem(values);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_ROLE_PERMISSION_ITEM_SUCCESS,
          });
        }
      } catch (error: any) {
        dispatch({
          type: REMOVE_ROLE_PERMISSION_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
