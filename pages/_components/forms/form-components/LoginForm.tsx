import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { DarkButton } from "@/components/button/darkButton";
import { LoginPayload } from "@/redux/models/auth";
import { Space, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { InputFormField } from "../form-fields/InputFormField";
import { CheckboxFormField } from "../form-fields/CheckboxFormField";

export default function LoginForm({
  onLoginSubmit,
}: {
  onLoginSubmit: (payload: LoginPayload) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);

  const handleCheckboxChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      email: "",
      remember: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      email: Yup.string()
        .email(t("error.emailInvalid"))
        .required(t("error.required")),
      remember: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      await onLoginSubmit(values);
      await formik.setSubmitting(false);
    },
  });
  return (
    <Form layout="vertical" colon={false} onSubmitCapture={formik.handleSubmit}>
      <InputFormField formik={formik} label="Email" name="email" />
      <InputFormField
        formik={formik}
        type={"password"}
        label="Password"
        name="password"
      />
      <div className="flex justify-between mb-4 items-baseline">
        <CheckboxFormField
          formik={formik}
          name="remember"
          onChange={handleCheckboxChange}
        >
          {t("auth:login.rememberMe")}
        </CheckboxFormField>
        <Link href={"/"} className="text-xs text-blueDark focus:text-blueDark hover:text-blueDark">
          {t("auth:login.forgotPass")}
        </Link>
      </div>
      <DarkButton type="submit" className="w-full" disabled={formik.isSubmitting}>
        <Space>
          {formik.isSubmitting && <LoadingOutlined />}
          {t("auth:login.signIn")}
        </Space>
      </DarkButton>
    </Form>
  );
}
