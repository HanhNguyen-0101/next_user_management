import { DrawerConstant } from "../constants";

export const DrawerType = {
  openDrawer: (payload: any): any => ({
    type: DrawerConstant.OPEN_DRAWER,
    payload,
  }),
  hideDrawer: () => ({
    type: DrawerConstant.HIDE_DRAWER,
  })
};

export const DrawerAction = {
  openDrawer: (data: any) => {
    return (dispatch: any) => {
      dispatch(DrawerType.openDrawer(data));
    };
  },
  hideDrawer: () => {
    return (dispatch: any) => {
      dispatch(DrawerType.hideDrawer());
    };
  }
};
