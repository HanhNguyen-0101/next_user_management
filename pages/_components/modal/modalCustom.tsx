import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Modal } from "antd";
import { ModalAction } from "@/redux/actions";

export default function ModalCustom() {
  const { visible, title, FormComponent, submitAction } = useSelector(
    (state: any) => state.modalReducer
  );

  const dispatch = useDispatch<Dispatch<any>>();
  const onClose = () => {
    dispatch(ModalAction.hideModal());
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={submitAction}
      onCancel={onClose}
    >
      {FormComponent}
    </Modal>
  );
}
