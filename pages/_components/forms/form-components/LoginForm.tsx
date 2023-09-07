import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CheckboxField, InputField } from "../form-fields";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { DarkButton } from "@/components/button/darkButton";

export default function LoginForm({ onLoginSubmit }) {
  const { t } = useTranslation("login");
  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
        remember: false,
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .max(15, t("error.charactersInvalid", { number: 15 }))
          .required(t("error.required")),
        email: Yup.string()
          .email(t("error.emailInvalid"))
          .required(t("error.required")),
        remember: Yup.boolean(),
      })}
      onSubmit={(values) => {
        onLoginSubmit(values);
      }}
    >
      <Form>
        <InputField label="Email" type="email" name="email" />
        <InputField label="Password" type="password" name="password" />
        <div className="flex justify-between mb-4 mt-2">
          <CheckboxField
            parentclassname="flex items-center"
            lableclassname="flex text-xs"
            name="remember"
            aria-label="Remember me"
          >
            {t("login.rememberMe")}
          </CheckboxField>
          <Link href={"/"} className="text-xs text-blueDark">
            {t("login.forgotPass")}
          </Link>
        </div>
        <DarkButton type="submit">{t("login.signIn")}</DarkButton>
      </Form>
    </Formik>
  );
}
