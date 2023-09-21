"use client";
import ForgetPasswordForm from "@/components/forms/form-components/ForgetPasswordForm";
import AuthLayout from "@/components/layout/auth.layout";
import { AuthAction } from "@/redux/actions";
import { ForgetPasswordPayload } from "@/redux/models/auth";
import { Space } from "antd";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

export default function ForgetPassword() {
  const dispatch = useDispatch<Dispatch<any>>();
  const { t } = useTranslation(["common", "auth"]);
  const { error } = useSelector((state: any) => state.authReducer);

  const handleSubmitForgetPasswordForm = (values: ForgetPasswordPayload) => {
    dispatch(AuthAction.resetPassword(values));
  };

  return (
    <div className="bg-white px-8 py-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
        {t("auth:forgetPassword.title")}
      </h2>
      <p className="text-xs text-gray-500 mb-4">{t("auth:forgetPassword.subTitle")}</p>
      {error && <div className="error">{error}</div>}
      <ForgetPasswordForm onForgetPasswordSubmit={handleSubmitForgetPasswordForm} />
      <div className="text-xs text-gray-500 mt-3 text-center">
        <Space>
          {t("auth:forgetPassword.checkEmail")}
          <Link
            href={"/"}
            className="text-blueDark hover:text-blueDark focus:text-blueDark"
          >
            {t("auth:login.signIn")}
          </Link>
        </Space>
      </div>
    </div>
  );
}

ForgetPassword.getLayout = function getLayout(page: ReactElement) {
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
