"use client";
import { useDispatch } from "react-redux";
import React, { ReactElement } from "react";
import { AuthAction } from "@/redux/actions";
import AuthLayout from "@/components/layout/auth.layout";
import LoginForm from "@/components/forms/form-components/LoginForm";
import { LoginPayload } from "@/redux/models/auth";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export default function LoginPage( _props: InferGetStaticPropsType<typeof getStaticProps>) {

  const dispatch = useDispatch();

  const handleSubmitLoginForm = (values: LoginPayload) => {
    dispatch(AuthAction.login(values));
  };

  const handleSubmitLoginGoogleForm = (values) => {
    dispatch(AuthAction.loginGoogle());
  }
  // const name = useSelector((state) => state.authReducer.name);

  // useEffect(() => {
  //   dispatch(AuthAction.getDataService());
  // }, []);
  // if (!name) {
  //   notFound();
  // }

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
      <LoginForm onLoginSubmit={handleSubmitLoginForm} onGoogleLoginSubmit={handleSubmitLoginGoogleForm}/>
    </div>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translationsProps = await serverSideTranslations(locale ?? "en", [
    "login",
  ]);

  return {
    props: {
      ...translationsProps,
    },
  };
};
