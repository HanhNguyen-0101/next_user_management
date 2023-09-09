"use client";
import { useDispatch } from "react-redux";
import React, { ReactElement } from "react";
import { AuthAction } from "@/redux/actions";
import AuthLayout from "@/components/layout/auth.layout";
import { RegisterPayload } from "@/redux/models/auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RegisterForm from "@/components/forms/form-components/RegisterForm";
import { useRouter } from "next/router";
import { Dispatch } from "redux";
import { Space } from "antd";
import Link from "next/link";
import { useTranslation } from "next-i18next";
export default function RegisterPage() {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { t } = useTranslation(["common", "auth"]);

  const handleSubmitRegisterForm = (values: RegisterPayload) => {
    dispatch(AuthAction.register(values));
    router.push("/login");
  };

  return (
    <div className="bg-white px-8 py-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
        {t("auth:register.createAccount")}
      </h2>
      <p className="text-xs text-gray-500 mb-5">{t("auth:register.signUpDesc")}</p>
      <RegisterForm onRegisterSubmit={handleSubmitRegisterForm} />
      <div className="text-xs text-gray-500 mt-3 text-center">
        <Space>
          {t("auth:register.haveAnAccount")}
          <Link href={"/"} className="text-blueDark">
            {t("auth:login.signIn")}
          </Link>
        </Space>
      </div>
    </div>
  );
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
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
