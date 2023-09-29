import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { UserConstant } from "../constants";
import { QueryPayload } from "../models/common";
import {
  DeleteUserByIdPayload,
  DeleteUserResponse,
  GetUserByIdPayload,
  GetUserResponse,
} from "../models/user";
import { UserService } from "../services";

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
  getAll: (query?: QueryPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await UserService.getAll(query);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_USER_LIST_SUCCESS,
            payload: {
              data,
              query,
            },
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
        const { status, data }: DeleteUserResponse =
          await UserService.deleteItem(values.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_USER_ITEM_SUCCESS,
            payload: data,
          });
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
