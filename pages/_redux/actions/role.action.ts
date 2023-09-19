import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { DrawerAction } from ".";
import { RoleConstant } from "../constants";
import { QueryPayload } from "../models/common";
import {
  AddRolePayload,
  DeleteRoleResponse,
  EditRolePayload,
  GetRoleByIdPayload,
  GetRoleResponse
} from "../models/role";
import { RoleService } from "../services";

const {
  GET_ROLE_LIST_SUCCESS,
  GET_ROLE_LIST_FAILUER,
  GET_ROLE_ITEM_SUCCESS,
  GET_ROLE_ITEM_FAILUER,
  ADD_ROLE_ITEM_SUCCESS,
  ADD_ROLE_ITEM_FAILUER,
  EDIT_ROLE_ITEM_SUCCESS,
  EDIT_ROLE_ITEM_FAILURE,
  REMOVE_ROLE_ITEM_SUCCESS,
  REMOVE_ROLE_ITEM_FAILURE,
} = RoleConstant;

export const RoleAction = {
  getAll: (query?: QueryPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await RoleService.getAll(query);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_ROLE_LIST_SUCCESS,
            payload: { data, query },
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_ROLE_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  addItem: (payload: { addPayload: AddRolePayload; query: QueryPayload }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await RoleService.addItem(payload.addPayload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_ROLE_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "A new item is added successfully!"
        );
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(RoleAction.getAll({ ...payload.query, page: 1 }));
      } catch (error: any) {
        dispatch({
          type: ADD_ROLE_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  getItemById: (values: GetRoleByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: GetRoleResponse = await RoleService.getItemById(
          values.id
        );
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_ROLE_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_ROLE_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  editItem: (payload: {
    editPayload: EditRolePayload;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await RoleService.updateItem(
          payload.editPayload.id,
          payload.editPayload.data
        );
        if (status === STATUS_CODE.SUCCESS) {
          await dispatch({
            type: EDIT_ROLE_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(NOTIF_TYPE.SUCCESS, "Updated successfully!");
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(RoleAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: EDIT_ROLE_ITEM_FAILURE,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  removeItem: (payload: {
    id: string;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: DeleteRoleResponse =
          await RoleService.deleteItem(payload.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_ROLE_ITEM_SUCCESS,
            payload: data,
          });
        }
        openNotification(NOTIF_TYPE.SUCCESS, "Deleted succesfully");
        dispatch(RoleAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: REMOVE_ROLE_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
