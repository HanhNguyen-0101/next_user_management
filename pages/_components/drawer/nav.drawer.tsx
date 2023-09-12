import React from "react";
import { Drawer, Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DrawerAction } from "@/redux/actions";
import { Dispatch } from "redux";

export default function DrawerNav() {
  const { visible, title, FormComponent, submitAction } = useSelector(
    (state: any) => state.drawerReducer);

  const dispatch = useDispatch<Dispatch<any>>();
  const onClose = () => {
    dispatch(DrawerAction.hideDrawer());
  };

  return (
    <Drawer
      title={<span className="text-white">{title}</span>}
      placement="right"
      open={visible}
      closable={false}
      size="large"
      className="drawer"
      footer={
        <Space>
          <Button className="capitalize" onClick={onClose}>cancel</Button>
          <Button type="primary" className="capitalize" onClick={submitAction}>
          confirm
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: "left", backgroundColor: "#17759F", borderColor: "transparent" }}
      headerStyle={{ backgroundColor: "#17759F", borderColor: "transparent" }}
      bodyStyle={{ backgroundColor: "#ffffff" }}
    >
      {FormComponent}
    </Drawer>
  );
}