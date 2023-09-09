import { Dispatch } from "redux";
import { DrawerConstant } from "../constants";
import { DrawerPayload } from "../models/common";

const { OPEN_DRAWER, HIDE_DRAWER } = DrawerConstant;

export const DrawerAction = {
  openDrawer: (data: DrawerPayload) => {
    return (dispatch: Dispatch) => {
      dispatch({
        type: OPEN_DRAWER,
        payload: data,
      });
    };
  },
  hideDrawer: () => {
    return (dispatch: Dispatch) => {
      dispatch({
        type: HIDE_DRAWER,
      });
    };
  },
};
