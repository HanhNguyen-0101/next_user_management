import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { Space, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction, ModalAction } from "@/redux/actions";
import { InputFormField } from "../form-fields/InputFormField";
import { UserAction } from "@/redux/actions/user.action";
import { CheckboxFormField } from "../form-fields/CheckboxFormField";

export default function EditProfileForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { profile } = useSelector((state: any) => state.authReducer);
  const handleCheckboxChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profile?.email || "",
      firstName: profile?.firstName || "",
      globalId: profile?.globalId || "",
      lastName: profile?.lastName || "",
      officeCode: profile?.officeCode || "",
      password: "",
      passwordConfirm: "",
      isChangePassword: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .ensure()
        .when("isChangePassword", {
          is: true,
          then: (schema) =>
            schema
              .max(30, t("error.charactersInvalid", { number: 30 }))
              .required(t("error.required")),
        }),
      passwordConfirm: Yup.string()
        .ensure()
        .when("isChangePassword", {
          is: true,
          then: (schema) =>
            schema
              .max(30, t("error.charactersInvalid", { number: 30 }))
              .required(t("error.required"))
              .oneOf([Yup.ref("password")], t("error.passwordNotMatch")),
        }),
      email: Yup.string()
        .email(t("error.emailInvalid"))
        .required(t("error.required")),
      firstName: Yup.string()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      lastName: Yup.string()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      globalId: Yup.string().max(
        10,
        t("error.charactersInvalid", { number: 10 })
      ),
      officeCode: Yup.string().max(
        10,
        t("error.charactersInvalid", { number: 10 })
      ),
    }),
    onSubmit: async (values) => {
      const isChangePassword = values.isChangePassword;
      if (!values.isChangePassword) {
        values.password = profile?.password;
      }
      delete values["isChangePassword"];
      delete values["passwordConfirm"];
      await dispatch(AuthAction.editProfile(profile?.id, values));
    },
  });
  useEffect(() => {
    dispatch(ModalAction.setCallbackModal(formik.resetForm));
    dispatch(ModalAction.setCallbackModal(formik.handleSubmit));
  }, []);
  return (
    <Form
      layout="vertical"
      colon={false}
      className="p-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <div className="text-center mb-8">
        <h3 className="font-bold text-lg text-blueDark">
          <Space>
            {profile?.firstName}
            {profile?.lastName}
          </Space>
        </h3>
        <div className="text-gray-500 text-sm">{profile?.email}</div>
      </div>
      <Space className="grid grid-cols-2 items-start">
        <InputFormField
          formik={formik}
          label="First Name"
          name="firstName"
          isRequired={true}
        />
        <InputFormField
          formik={formik}
          label="Last Name"
          name="lastName"
          isRequired={true}
        />
      </Space>
      <Space className="grid grid-cols-2 items-start">
        <InputFormField formik={formik} label="Office Code" name="officeCode" />
        <InputFormField formik={formik} label="Global ID" name="globalId" />
      </Space>
      <CheckboxFormField
        formik={formik}
        name="isChangePassword"
        onChange={handleCheckboxChange}
      >
        Change password?
      </CheckboxFormField>
      {formik.values.isChangePassword && (
        <>
          <InputFormField
            formik={formik}
            type="password"
            label="New Password"
            name="password"
            isRequired={true}
          />
          <InputFormField
            formik={formik}
            type={"password"}
            label="New Password Confirm"
            name="passwordConfirm"
            isRequired={true}
          />
        </>
      )}
    </Form>
  );
}
