import { STATUS_CODE } from "@/constants/configSetting";
import { Dispatch } from "redux";
import { RoleService } from "../services";
import { RoleConstant } from "../constants";
import { QueryPayload } from "../models/common";

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
            payload: { data },
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
};
