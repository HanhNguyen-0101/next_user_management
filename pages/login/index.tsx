"use client";
import { notFound } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { ReactElement, useEffect } from "react";
import { AuthAction } from "@/redux/actions";
import AuthLayout from "@/components/layout/auth.layout";
import LoginForm from "@/components/forms/form-components/LoginForm";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { Button } from "antd";
import DrawerNav from "@/components/drawer/nav.drawer";
import { DrawerAction } from "@/redux/actions/drawer.action";
export default function LoginPage() {
  // const [user, setUser] = useState([]);

  const name = useSelector((state) => state.authReducer.name);
  const dispatch = useDispatch();

  const handleSubmitForm = (values: any) => {
    alert(JSON.stringify(values));
  };

  useEffect(() => {
    dispatch(AuthAction.getDataService());
  }, []);
  if (!name) {
    notFound();
  }

  // const submitAction = () => {
  //   alert("12");
  // };
  // const openDrawer = () => {
  //   dispatch(
  //     DrawerAction.openDrawer({
  //       visible: true,
  //       title: "title",
  //       FormComponent: <LoginForm />,
  //       submitAction,
  //     })
  //   );
  // };

  return (
    <div className="bg-white p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      {/* <Button onClick={() => openNotification(NOTIF_TYPE.INFO, "11111111111", 'aaaaaaa asasasas')}>
        Success
      </Button> */}
      {/* <Button onClick={openDrawer}>Success</Button> */}
      <LoginForm onLoginSubmit={handleSubmitForm} />
    </div>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
