import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { InputField } from "../form-fields";
import Link from "next/link";
import { Space } from "antd";
import { useTranslation } from "next-i18next";
import { DarkButton } from "@/components/button/darkButton";

export default function RegisterForm({ onRegisterSubmit }) {
  const { t } = useTranslation("register");
  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .max(30, t("error.charactersInvalid", { number: 30 }))
          .required(t("error.required")),
        passwordConfirm: Yup.string()
          .max(30, t("error.charactersInvalid", { number: 30 }))
          .required(t("error.required")),
        firstName: Yup.string()
          .max(30, t("error.charactersInvalid", { number: 30 }))
          .required(t("error.required")),
        lastName: Yup.string()
          .max(30, t("error.charactersInvalid", { number: 30 }))
          .required(t("error.required")),
        email: Yup.string()
          .email(t("error.emailInvalid"))
          .required(t("error.required")),
      })}
      onSubmit={(values) => {
        onRegisterSubmit(values);
      }}
    >
      <Form>
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          {t("login.welcomeBack")}
        </h2>
        <p className="text-xs text-gray-500 mb-5">{t("login.signInDesc")}</p>
        <InputField label="Email" type="email" name="email" />
        <InputField label="Firstname" type="text" name="firstName" />
        <InputField label="Lastname" type="text" name="lastName" />
        <InputField label="Password" type="password" name="password" />
        <InputField label="Password" type="password" name="passwordConfirm" />
        <DarkButton type="submit">{t("login.signIn")}</DarkButton>
        <div className="text-xs text-gray-500 mt-3 text-center">
          <Space>
            {t("login.dontHaveAccount")}
            <Link href={"/"} className="text-blueDark">
              {t("login.signUp")}
            </Link>
          </Space>
        </div>
      </Form>
    </Formik>
  );
}
