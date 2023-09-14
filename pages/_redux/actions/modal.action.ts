import { ModalConstant } from "../constants";
import { ModalPayload } from "../models/common";

const { OPEN_MODAL, HIDE_MODAL, SET_CALLBACK_MODAL, SET_RESET_CALLBACK_MODAL } = ModalConstant;

export const ModalAction = {
  openModal: (data: ModalPayload) => ({
    type: OPEN_MODAL,
    payload: data,
  }),
  hideModal: () => ({
    type: HIDE_MODAL,
  }),
  setCallbackModal: (submitAction: any) => {
    return ({
      type: SET_CALLBACK_MODAL,
      payload: submitAction,
    })
  },
  setResetCallbackModal: (resetAction: any) => {
    return ({
      type: SET_RESET_CALLBACK_MODAL,
      payload: resetAction,
    })
  },
};
