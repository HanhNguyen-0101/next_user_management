"use client";
import { LightButton } from "@/components/button/lightButton";
import LoginForm from "@/components/forms/form-components/LoginForm";
import AuthLayout from "@/components/layout/auth.layout";
import { AuthAction } from "@/redux/actions";
import { LoginPayload } from "@/redux/models/auth";
import { GoogleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

export default function LoginPage() {
  const dispatch = useDispatch<Dispatch<any>>();
  const { t } = useTranslation(["common", "auth"]);
  const { error } = useSelector((state: any) => state.authReducer);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(
        AuthAction.loginGoogle({
          ...session?.user,
          firstName: session?.user?.name,
          password: "default",
        })
      );
    }
  }, [session, status]);

  const handleSubmitLoginForm = (values: LoginPayload) => {
    dispatch(AuthAction.login(values));
  };

  return (
    <div className="bg-white px-8 py-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
        {t("auth:login.welcomeBack")}
      </h2>
      <p className="text-xs text-gray-500 mb-4">{t("auth:login.signInDesc")}</p>
      {error && <div className="error">{error}</div>}
      <LoginForm onLoginSubmit={handleSubmitLoginForm} />
      <LightButton type="button" onClick={() => signIn("google")}>
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
