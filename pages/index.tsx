"use client";
import { LightButton } from "@/components/button/lightButton";
import LoginForm from "@/components/forms/form-components/LoginForm";
import AuthLayout from "@/components/layout/auth.layout";
import { AuthAction } from "@/redux/actions";
import { LoginPayload } from "@/redux/models/auth";
import { GoogleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

export default function LoginPage() {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { t } = useTranslation(["common", "auth"]);
  const { error } = useSelector((state: any) => state.authReducer);

  const handleSubmitLoginForm = async (values: LoginPayload) => {
    await dispatch(AuthAction.login(values));
    await router.push("/dashboard");

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
      {error && <div className="error">{error}</div>}
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
          <Link
            href={"/register"}
            className="text-blueDark hover:text-blueDark focus:text-blueDark"
          >
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
