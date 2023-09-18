import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import { UserRoleService, UserService } from "../services";
import { UserRoleConstant } from "../constants";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import {
  AddUserRolePayload,
  DeleteUserRolePayload,
  DeleteUserRoleResponse,
} from "../models/userRole";

const {
  GET_USER_ROLE_LIST_SUCCESS,
  GET_USER_ROLE_LIST_FAILUER,
  GET_USER_ROLE_ITEM_SUCCESS,
  GET_USER_ROLE_ITEM_FAILUER,
  ADD_USER_ROLE_ITEM_SUCCESS,
  ADD_USER_ROLE_ITEM_FAILUER,
  EDIT_USER_ROLE_ITEM_SUCCESS,
  EDIT_USER_ROLE_ITEM_FAILURE,
  REMOVE_USER_ROLE_ITEM_SUCCESS,
  REMOVE_USER_ROLE_ITEM_FAILURE,
} = UserRoleConstant;

export const UserRoleAction = {
  addItem: (payload: AddUserRolePayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserRoleService.addItem(payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_USER_ROLE_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: ADD_USER_ROLE_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  removeItem: (values: DeleteUserRolePayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status }: DeleteUserRoleResponse =
          await UserRoleService.deleteItem(values);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_USER_ROLE_ITEM_SUCCESS,
          });
        }
      } catch (error: any) {
        dispatch({
          type: REMOVE_USER_ROLE_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
