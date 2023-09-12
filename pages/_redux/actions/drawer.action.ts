import { DrawerConstant } from "../constants";
import { DrawerPayload } from "../models/common";

const { OPEN_DRAWER, HIDE_DRAWER, SET_CALLBACK_DRAWER } = DrawerConstant;

export const DrawerAction = {
  openDrawer: (data: DrawerPayload) => ({
    type: OPEN_DRAWER,
    payload: data,
  }),
  hideDrawer: () => ({
    type: HIDE_DRAWER,
  }),
  setCallbackDrawer: (submitAction: any) => {
    return ({
      type: SET_CALLBACK_DRAWER,
      payload: submitAction,
    })
  },
};
