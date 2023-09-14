import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import { UserService } from "../services";
import { UserConstant } from "../constants";
import {
  DeleteUserByIdPayload,
  DeleteUserResponse,
  GetUserByIdPayload,
  GetUserResponse,
} from "../models/user";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { DrawerAction } from ".";
import { ITEM_PER_PAGE } from "pages/_utils/constant";

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
  getAll: (query: any) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserService.getAll(query);
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
        const { status, data }: GetUserResponse = await UserService.getItemById(
          values.id
        );
        console.log('action', data)
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
        openNotification(
          NOTIF_TYPE.SUCCESS,
          "A new user is added successfully!"
        );
        dispatch(DrawerAction.hideDrawer());
        dispatch(UserAction.getAll(`page=1&item_per_page=${ITEM_PER_PAGE}`));
      } catch (error: any) {
        dispatch({
          type: ADD_USER_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
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
          openNotification(
            NOTIF_TYPE.SUCCESS,
            "User is updated successfully!"
          );
          dispatch(DrawerAction.hideDrawer());
          dispatch(UserAction.getAll(`page=1&item_per_page=${ITEM_PER_PAGE}`));
        }
      } catch (error: any) {
        dispatch({
          type: EDIT_USER_ITEM_FAILURE,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  removeItem: (values: DeleteUserByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: DeleteUserResponse =
          await UserService.deleteItem(values.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_USER_ITEM_SUCCESS,
            payload: data,
          });
          openNotification(NOTIF_TYPE.SUCCESS, 'User is deleted succesfully');
        }
        dispatch(UserAction.getAll(`page=1&item_per_page=${ITEM_PER_PAGE}`));
      } catch (error: any) {
        dispatch({
          type: REMOVE_USER_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
