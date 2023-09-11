import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import { UserService } from "../services";
import { UserConstant } from "../constants";
import { DeleteUserByIdPayload, DeleteUserResponse, GetUserByIdPayload, GetUserResponse } from "../models/user";
import { NOTIF_TYPE, openNotification } from "@/components/notification/notification";

const {
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILUER,
  GET_USER_ITEM_SUCCESS,
  GET_USER_ITEM_FAILUER,
  ADD_USER_ITEM_SUCCESS,
  ADD_USER_ITEM_FAILUER,
  EDIT_USER_ITEM_SUCCESS,
  EDIT_USER_ITEM_FAILURE,
  REMOVE_USER_ITEM_SUCCESS,
  REMOVE_USER_ITEM_FAILURE,
} = UserConstant;

export const UserAction = {
  getAll: () => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserService.getAll();
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_USER_LIST_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_USER_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  getItemById: (values: GetUserByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const {
          status,
          data,
        }: GetUserResponse =
          await UserService.getItemById(values.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_USER_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_USER_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  addItem: (payload: any) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserService.addItem(payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_USER_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: ADD_USER_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  editItem: (id: string, payload: any) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserService.updateItem(id, payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: EDIT_USER_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: EDIT_USER_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
  removeItem: (values: DeleteUserByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: DeleteUserResponse = await UserService.deleteItem(values.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_USER_ITEM_SUCCESS,
            payload: data,
          });
          openNotification(NOTIF_TYPE.SUCCESS, data);
        }
      } catch (error: any) {
        dispatch({
          type: REMOVE_USER_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
