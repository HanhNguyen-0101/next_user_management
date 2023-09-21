import { DarkButton } from "@/components/button/darkButton";
import { ForgetPasswordPayload, LoginPayload } from "@/redux/models/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import * as Yup from "yup";
import { CheckboxFormField, InputFormField } from "../form-fields";

export default function ForgetPasswordForm({
  onForgetPasswordSubmit,
}: {
  onForgetPasswordSubmit: (payload: ForgetPasswordPayload) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);

  const handleCheckboxChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim()
        .email(t("error.emailInvalid"))
        .required(t("error.required")),
    }),
    onSubmit: async (values) => {
      await onForgetPasswordSubmit(values);
      await formik.setSubmitting(false);
    },
  });
  return (
    <Form layout="vertical" colon={false} onSubmitCapture={formik.handleSubmit}>
      <InputFormField formik={formik} label="Email" name="email" />
      <DarkButton type="submit" className="w-full" disabled={formik.isSubmitting}>
        <Space>
          {formik.isSubmitting && <LoadingOutlined />}
          {t("auth:forgetPassword.resetPassword")}
        </Space>
      </DarkButton>
    </Form>
  );
}
