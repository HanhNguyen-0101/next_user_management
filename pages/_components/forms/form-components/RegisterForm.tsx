import { DarkButton } from "@/components/button/darkButton";
import { RegisterPayload } from "@/redux/models/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";
import { InputFormField } from "../form-fields";

export default function RegisterForm({
  onRegisterSubmit,
}: {
  onRegisterSubmit: (payload: RegisterPayload) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      passwordConfirm: Yup.string().trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required"))
        .oneOf([Yup.ref("password")], t("error.passwordNotMatch")),
      firstName: Yup.string().trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      lastName: Yup.string().trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      email: Yup.string().trim()
        .email(t("error.emailInvalid"))
        .required(t("error.required")),
    }),
    onSubmit: async (values) => {
      await onRegisterSubmit(values);
      await formik.setSubmitting(false);
    },
  });

  return (
    <Form layout="vertical" colon={false} onSubmitCapture={formik.handleSubmit}>
      <InputFormField formik={formik} label="Email" name="email" />
      <InputFormField formik={formik} label="First Name" name="firstName" />
      <InputFormField formik={formik} label="Last Name" name="lastName" />
      <InputFormField
        formik={formik}
        type={"password"}
        label="Password"
        name="password"
      />
      <InputFormField
        formik={formik}
        type={"password"}
        label="Password"
        name="passwordConfirm"
      />
      <DarkButton
        type="submit"
        className="w-full"
        disabled={formik.isSubmitting}
      >
        <Space>
          {formik.isSubmitting && <LoadingOutlined />}
          {t("auth:register.signUp")}
        </Space>
      </DarkButton>
    </Form>
  );
}
