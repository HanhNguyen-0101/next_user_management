import React from "react";
import { Drawer, Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DrawerAction } from "@/redux/actions";
import { Dispatch } from "redux";

export default function DrawerNav() {
  const { visible, title, FormComponent, submitAction } = useSelector(
    (state: any) => state.drawerReducer
  );

  const dispatch = useDispatch<Dispatch<any>>();
  const onClose = () => {
    dispatch(DrawerAction.hideDrawer());
  };

  return (
    <Drawer
      title={<span className="text-blueDark">{title}</span>}
      footer={
        <Space className="float-right">
          <Button className="text-blueDark border-blueDark" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="bg-blueDark text-white"
            onClick={submitAction}
          >
            Confirm
          </Button>
        </Space>
      }
      placement="right"
      open={visible}
      closable={false}
      size="large"
      className="drawer"
      destroyOnClose={true}
    >
      {FormComponent}
    </Drawer>
  );
}
