import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { STATUS_CODE } from "pages/_utils/configSetting";
import { Dispatch } from "redux";
import { DrawerAction } from ".";
import { MdmVslCntrConstant } from "../constants";
import { QueryPayload } from "../models/common";
import Router from "next/router";
import {
  DeleteMdmVslCntrResponse,
  EditMdmVslCntrByIdPayload,
  GetMdmVslCntrByIdPayload,
  GetMdmVslCntrResponse,
  IMdmVslCntrModel,
} from "../models/mdmVslCntr";
import { MdmVslCntrService } from "../services";

const {
  GET_MDM_VSL_CNTR_LIST_SUCCESS,
  GET_MDM_VSL_CNTR_LIST_FAILUER,
  GET_MDM_VSL_CNTR_ITEM_SUCCESS,
  GET_MDM_VSL_CNTR_ITEM_FAILUER,
  ADD_MDM_VSL_CNTR_ITEM_SUCCESS,
  ADD_MDM_VSL_CNTR_ITEM_FAILUER,
  EDIT_MDM_VSL_CNTR_ITEM_SUCCESS,
  EDIT_MDM_VSL_CNTR_ITEM_FAILURE,
  REMOVE_MDM_VSL_CNTR_ITEM_SUCCESS,
  REMOVE_MDM_VSL_CNTR_ITEM_FAILURE,

  SET_CALLBACK_NEXT_STEP_ACTION,
  SET_NEXT_STEP_DATA,
  SET_PREVIOUS_STEP_DATA,
} = MdmVslCntrConstant;

export const MdmVslCntrAction = {
  getAll: (query?: QueryPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MdmVslCntrService.getAll(query);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_MDM_VSL_CNTR_LIST_SUCCESS,
            payload: { data, query },
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_MDM_VSL_CNTR_LIST_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  addItem: (payload: IMdmVslCntrModel) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MdmVslCntrService.addItem(payload);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: ADD_MDM_VSL_CNTR_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "A new item is added successfully!"
        );
        await dispatch(DrawerAction.hideDrawer());
      } catch (error: any) {
        dispatch({
          type: ADD_MDM_VSL_CNTR_ITEM_FAILUER,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  getItemById: (values: GetMdmVslCntrByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: GetMdmVslCntrResponse =
          await MdmVslCntrService.getItemById(values.id.toString());
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: GET_MDM_VSL_CNTR_ITEM_SUCCESS,
            payload: data,
          });
        }
      } catch (error: any) {
        dispatch({
          type: GET_MDM_VSL_CNTR_ITEM_FAILUER,
          payload: error.response,
        });
      }
    };
  },
  editItem: (payload: EditMdmVslCntrByIdPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data } = await MdmVslCntrService.updateItem(
          payload.id,
          payload.data
        );
        if (status === STATUS_CODE.SUCCESS) {
          await dispatch({
            type: EDIT_MDM_VSL_CNTR_ITEM_SUCCESS,
            payload: data,
          });
        }
        await openNotification(NOTIF_TYPE.SUCCESS, "Updated successfully!");
        Router.push(`/mdm_vsl_cntr/detail/${payload.id}`);
      } catch (error: any) {
        dispatch({
          type: EDIT_MDM_VSL_CNTR_ITEM_FAILURE,
          payload: error.response,
        });
        openNotification(NOTIF_TYPE.ERROR, error.response.data.message);
      }
    };
  },
  removeItem: (payload: { id: string; query: QueryPayload }) => {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const { status, data }: DeleteMdmVslCntrResponse =
          await MdmVslCntrService.deleteItem(payload.id);
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: REMOVE_MDM_VSL_CNTR_ITEM_SUCCESS,
            payload: data,
          });
        }
        openNotification(NOTIF_TYPE.SUCCESS, "Deleted succesfully");
        dispatch(MdmVslCntrAction.getAll(payload.query));
      } catch (error: any) {
        dispatch({
          type: REMOVE_MDM_VSL_CNTR_ITEM_FAILURE,
          payload: error.response,
        });
      }
    };
  },

  setCallbackNextStep: (submitAction: any) => ({
    type: SET_CALLBACK_NEXT_STEP_ACTION,
    payload: submitAction,
  }),
  setNextStepData: (data: any) => ({
    type: SET_NEXT_STEP_DATA,
    payload: data,
  }),
  setPreviousStepData: () => ({
    type: SET_PREVIOUS_STEP_DATA,
  })
};
