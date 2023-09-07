"use client";
import { useDispatch } from "react-redux";
import React, { ReactElement } from "react";
import { AuthAction } from "@/redux/actions";
import AuthLayout from "@/components/layout/auth.layout";
import { LoginPayload, RegisterPayload } from "@/redux/models/auth";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RegisterForm from "@/components/forms/form-components/RegisterForm";
import { useRouter } from "next/router";
export default function RegisterPage( _props: InferGetStaticPropsType<typeof getStaticProps>) {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmitRegisterForm = (values: RegisterPayload) => {
    dispatch(AuthAction.register(values));
    router.push('/login');
  };

  return (
    <div className="bg-white px-8 py-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <RegisterForm onRegisterSubmit={handleSubmitRegisterForm}/>
    </div>
  );
}

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translationsProps = await serverSideTranslations(locale ?? "en", [
    "register",
  ]);

  return {
    props: {
      ...translationsProps,
    },
  };
};
