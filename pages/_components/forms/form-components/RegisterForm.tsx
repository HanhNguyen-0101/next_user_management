import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { InputField } from "../form-fields";
import { useTranslation } from "next-i18next";
import { DarkButton } from "@/components/button/darkButton";
import { RegisterPayload } from "@/redux/models/auth";

export default function RegisterForm({
  onRegisterSubmit,
}: {
  onRegisterSubmit: (payload: RegisterPayload) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);
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
        <InputField label="Email" type="email" name="email" />
        <InputField label="Firstname" type="text" name="firstName" />
        <InputField label="Lastname" type="text" name="lastName" />
        <InputField label="Password" type="password" name="password" />
        <InputField label="Password" type="password" name="passwordConfirm" />
        <DarkButton type="submit">{t("auth:login.signIn")}</DarkButton>
      </Form>
    </Formik>
  );
}
