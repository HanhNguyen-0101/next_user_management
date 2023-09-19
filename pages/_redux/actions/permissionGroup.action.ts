import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { PermissionGroupConstant } from "../constants";
import { QueryPayload } from "../models/common";
import { PermissionGroupService } from "../services";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { DrawerAction } from ".";
import {
  AddPermissionGroupPayload,
  DeletePermissionGroupResponse,
  EditPermissionGroupPayload,
  GetPermissionGroupByIdPayload,
  GetPermissionGroupResponse,
} from "../models/permissionGroup";

const {
  GET_PERMISSION_GROUP_LIST_SUCCESS,
  GET_PERMISSION_GROUP_LIST_FAILUER,
  ADD_PERMISSION_GROUP_ITEM_SUCCESS,
  ADD_PERMISSION_GROUP_ITEM_FAILUER,
  EDIT_PERMISSION_GROUP_ITEM_SUCCESS,
  EDIT_PERMISSION_GROUP_ITEM_FAILURE,
  GET_PERMISSION_GROUP_ITEM_SUCCESS,
  GET_PERMISSION_GROUP_ITEM_FAILUER,
  REMOVE_PERMISSION_GROUP_ITEM_SUCCESS,
  REMOVE_PERMISSION_GROUP_ITEM_FAILURE,
} = PermissionGroupConstant;

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
  addItem: (payload: {
    addPayload: AddPermissionGroupPayload;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await PermissionGroupService.addItem(
          payload.addPayload
        );
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_PERMISSION_GROUP_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "A new item is added successfully!"
        );
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(
          PermissionGroupAction.getAll({ ...payload.query, page: 1 })
        );
      } catch (error: any) {
        dispatch({
          type: ADD_PERMISSION_GROUP_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  getItemById: (values: GetPermissionGroupByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: GetPermissionGroupResponse =
          await PermissionGroupService.getItemById(values.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_PERMISSION_GROUP_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_PERMISSION_GROUP_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  editItem: (payload: {
    editPayload: EditPermissionGroupPayload;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await PermissionGroupService.updateItem(
          payload.editPayload.id,
          payload.editPayload.data
        );
        if (status === STATUS_CODE.SUCCESS) {
          await dispatch({
            type: EDIT_PERMISSION_GROUP_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(NOTIF_TYPE.SUCCESS, "Updated successfully!");
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(PermissionGroupAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: EDIT_PERMISSION_GROUP_ITEM_FAILURE,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  removeItem: (payload: { id: string; query: QueryPayload }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: DeletePermissionGroupResponse =
          await PermissionGroupService.deleteItem(payload.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_PERMISSION_GROUP_ITEM_SUCCESS,
            payload: data,
          });
        }
        openNotification(NOTIF_TYPE.SUCCESS, "Deleted succesfully");
        dispatch(PermissionGroupAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: REMOVE_PERMISSION_GROUP_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
