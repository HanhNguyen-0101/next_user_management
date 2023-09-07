"use client";
import { useDispatch } from "react-redux";
import React, { ReactElement } from "react";
import { AuthAction } from "@/redux/actions";
import AuthLayout from "@/components/layout/auth.layout";
import LoginForm from "@/components/forms/form-components/LoginForm";
import { LoginPayload } from "@/redux/models/auth";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { LightButton } from "@/components/button/lightButton";
import { Space } from "antd";
import Link from "next/link";
import { GoogleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function LoginPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("login");

  const handleSubmitLoginForm = (values: LoginPayload) => {
    dispatch(AuthAction.login(values));
    router.push('/dashboard')
  };

  const handleSubmitLoginGoogleForm = (values) => {
    dispatch(AuthAction.loginGoogle());
  };
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
    <div className="bg-white px-8 py-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      {/* <Button onClick={() => openNotification(NOTIF_TYPE.INFO, "11111111111", 'aaaaaaa asasasas')}>
        Success
      </Button> */}
      {/* <Button onClick={openDrawer}>Success</Button> */}
      <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
        {t("login.welcomeBack")}
      </h2>
      <p className="text-xs text-gray-500 mb-4">{t("login.signInDesc")}</p>
      <LoginForm onLoginSubmit={handleSubmitLoginForm} />
      <LightButton type="button" onClick={handleSubmitLoginGoogleForm}>
        <Space>
          <GoogleOutlined style={{ fontSize: 25 }} />
          {t("login.signInGG")}
        </Space>
      </LightButton>
      <div className="text-xs text-gray-500 mt-3 text-center">
        <Space>
          {t("login.dontHaveAccount")}
          <Link href={"/"} className="text-blueDark">
            {t("login.signUp")}
          </Link>
        </Space>
      </div>
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
