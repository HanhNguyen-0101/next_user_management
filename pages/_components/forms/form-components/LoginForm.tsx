import { DarkButton } from "@/components/button/darkButton";
import { LoginPayload } from "@/redux/models/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import * as Yup from "yup";
import { CheckboxFormField, InputFormField } from "../form-fields";

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
      password: Yup.string().trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      email: Yup.string().trim()
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
