import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Button, Modal } from "antd";
import { ModalAction } from "@/redux/actions";

export default function ModalCustom() {
  const {
    visible,
    title,
    FormComponent,
    submitAction,
    hiddenSubmitBtn,
    actionText = "Save",
  } = useSelector((state: any) => state.modalReducer);
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
      cancelButtonProps={{ className: "hidden" }}
      destroyOnClose={true}
      footer={
        !hiddenSubmitBtn && [
          <Button
            key="submit"
            type="primary"
            className="bg-blueDark mr-4"
            onClick={submitAction}
          >
            {actionText}
          </Button>,
        ]
      }
    >
      {FormComponent}
    </Modal>
  );
}
