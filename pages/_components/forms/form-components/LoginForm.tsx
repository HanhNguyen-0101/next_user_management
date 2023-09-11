import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CheckboxField, InputField } from "../form-fields";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { DarkButton } from "@/components/button/darkButton";
import { LoginPayload } from "@/redux/models/auth";
import { Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function LoginForm({
  onLoginSubmit,
}: {
  onLoginSubmit: (payload: LoginPayload) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);
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
      {({ isSubmitting }) => (
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
              {t("auth:login.rememberMe")}
            </CheckboxField>
            <Link href={"/"} className="text-xs text-blueDark">
              {t("auth:login.forgotPass")}
            </Link>
          </div>
          <DarkButton type="submit" disabled={isSubmitting} className='w-full'>
            <Space>
              {isSubmitting && <LoadingOutlined />}
              {t("auth:login.signIn")}
            </Space>
          </DarkButton>
        </Form>
      )}
    </Formik>
  );
}
