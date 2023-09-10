"use client";
import { useDispatch } from "react-redux";
import React, { ReactElement } from "react";
import { AuthAction } from "@/redux/actions";
import AuthLayout from "@/components/layout/auth.layout";
import LoginForm from "@/components/forms/form-components/LoginForm";
import { LoginPayload } from "@/redux/models/auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { LightButton } from "@/components/button/lightButton";
import { Space } from "antd";
import Link from "next/link";
import { GoogleOutlined } from "@ant-design/icons";
import { Dispatch } from "redux";

export default function LoginPage() {
  const dispatch = useDispatch<Dispatch<any>>();
  const { t } = useTranslation(["common", "auth"]);
  const handleSubmitLoginForm = (values: LoginPayload) => {
    dispatch(AuthAction.login(values));
  };

  const handleSubmitLoginGoogleForm = () => {
    dispatch(AuthAction.loginGoogle());
  };

  return (
    <div className="bg-white px-8 py-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
        {t("auth:login.welcomeBack")}
      </h2>
      <p className="text-xs text-gray-500 mb-4">{t("auth:login.signInDesc")}</p>
      <LoginForm onLoginSubmit={handleSubmitLoginForm} />
      <LightButton type="button" onClick={handleSubmitLoginGoogleForm}>
        <Space>
          <GoogleOutlined style={{ fontSize: 25 }} />
          {t("auth:login.signInGG")}
        </Space>
      </LightButton>
      <div className="text-xs text-gray-500 mt-3 text-center">
        <Space>
          {t("auth:login.dontHaveAccount")}
          <Link href={"/register"} className="text-blueDark hover:text-blueDark focus:text-blueDark">
            {t("auth:register.signUp")}
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
    "common",
    "auth",
  ]);

  return {
    props: {
      ...translationsProps,
    },
  };
};
