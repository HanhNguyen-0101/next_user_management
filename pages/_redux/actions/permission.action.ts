import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { DrawerAction } from ".";
import { PermissionConstant } from "../constants";
import { QueryPayload } from "../models/common";
import {
  AddPermissionPayload,
  DeletePermissionResponse,
  EditPermissionPayload,
  GetPermissionByIdPayload,
  GetPermissionResponse,
} from "../models/permission";
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
  addItem: (payload: {
    addPayload: AddPermissionPayload;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await PermissionService.addItem(
          payload.addPayload
        );
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_PERMISSION_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "A new item is added successfully!"
        );
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(PermissionAction.getAll({ ...payload.query, page: 1 }));
      } catch (error: any) {
        dispatch({
          type: ADD_PERMISSION_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  getItemById: (values: GetPermissionByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: GetPermissionResponse =
          await PermissionService.getItemById(values.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_PERMISSION_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_PERMISSION_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  editItem: (payload: {
    editPayload: EditPermissionPayload;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await PermissionService.updateItem(
          payload.editPayload.id,
          payload.editPayload.data
        );
        if (status === STATUS_CODE.SUCCESS) {
          await dispatch({
            type: EDIT_PERMISSION_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(NOTIF_TYPE.SUCCESS, "Updated successfully!");
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(PermissionAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: EDIT_PERMISSION_ITEM_FAILURE,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  removeItem: (payload: { id: string; query: QueryPayload }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: DeletePermissionResponse =
          await PermissionService.deleteItem(payload.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_PERMISSION_ITEM_SUCCESS,
            payload: data,
          });
        }
        openNotification(NOTIF_TYPE.SUCCESS, "Deleted succesfully");
        dispatch(PermissionAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: REMOVE_PERMISSION_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
