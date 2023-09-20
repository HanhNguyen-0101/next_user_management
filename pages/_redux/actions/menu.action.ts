import { MenuConstant } from "../constants";
import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { MenuService } from "../services";
import { QueryPayload } from "../models/common";
import { NOTIF_TYPE, openNotification } from "@/components/notification/notification";
import { DrawerAction } from ".";
import { AddMenuPayload, DeleteMenuResponse, EditMenuPayload, GetMenuByIdPayload, GetMenuResponse } from "../models/menu";

const {
  GET_MENU_LIST_SUCCESS, GET_MENU_LIST_FAILUER,
  ADD_MENU_ITEM_SUCCESS, ADD_MENU_ITEM_FAILUER,
  EDIT_MENU_ITEM_SUCCESS, EDIT_MENU_ITEM_FAILURE,
  REMOVE_MENU_ITEM_SUCCESS, REMOVE_MENU_ITEM_FAILURE,
  GET_MENU_ITEM_SUCCESS, GET_MENU_ITEM_FAILUER,
} = MenuConstant;

export const MenuAction = {
  getAll: (query?: QueryPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MenuService.getAll(query);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_MENU_LIST_SUCCESS,
            payload: {data, query},
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_MENU_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  addItem: (payload: { addPayload: AddMenuPayload; query: QueryPayload }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MenuService.addItem(payload.addPayload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_MENU_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "A new item is added successfully!"
        );
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(MenuAction.getAll({ ...payload.query, page: 1 }));
      } catch (error: any) {
        dispatch({
          type: ADD_MENU_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  getItemById: (values: GetMenuByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: GetMenuResponse = await MenuService.getItemById(
          values.id
        );
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_MENU_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_MENU_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  editItem: (payload: {
    editPayload: EditMenuPayload;
    query: QueryPayload;
  }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MenuService.updateItem(
          payload.editPayload.id,
          payload.editPayload.data
        );
        if (status === STATUS_CODE.SUCCESS) {
          await dispatch({
            type: EDIT_MENU_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(NOTIF_TYPE.SUCCESS, "Updated successfully!");
        await dispatch(DrawerAction.hideDrawer());
        await dispatch(MenuAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: EDIT_MENU_ITEM_FAILURE,
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
        const { status, data }: DeleteMenuResponse =
          await MenuService.deleteItem(payload.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_MENU_ITEM_SUCCESS,
            payload: data,
          });
        }
        openNotification(NOTIF_TYPE.SUCCESS, "Deleted succesfully");
        dispatch(MenuAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: REMOVE_MENU_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },
};
