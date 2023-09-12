import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { InputField, SwitchField } from "../form-fields";
import { useTranslation } from "next-i18next";
import { IUserModel } from "@/redux/models/user";
import { Space } from "antd";
import { useSelector } from "react-redux";

export default function EditUserForm({
  onEditUserSubmit,
}: {
  onEditUserSubmit: (payload: Partial<IUserModel>) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);
  const { user } = useSelector((state: any) => state.userReducer);
  console.log('--------------------------', user)
  return (
    <Formik
      initialValues={{
        email: user.email || '',
        firstName: user.firstName || "",
        globalId: user.globalId || "",
        isDisable: user.isDisable,
        isPending: user.isPending,
        lastName: user.lastName,
        officeCode: user.officeCode,
        password: user.password,
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .max(15, t("error.charactersInvalid", { number: 15 }))
          .required(t("error.required")),
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
        isDisable: Yup.boolean(),
        isPending: Yup.boolean(),
      })}
      onSubmit={(values) => {
        onEditUserSubmit(values);
      }}
    >
      <Form>
        <Space className="grid grid-cols-2">
          <InputField label="First Name" type="text" name="firstName" />
          <InputField label="Last Name" type="text" name="lastName" />
        </Space>
        <InputField label="Email" type="email" name="email" />
        <InputField label="Password" type="password" name="password" />
        <Space className="grid grid-cols-2">
          <InputField label="Office Code" type="text" name="officeCode" />
          <InputField label="Global ID" type="text" name="globalId" />
        </Space>
        <Space className="grid grid-cols-2">
          <SwitchField label="Is disabled?" name="isDisable" />
          <SwitchField label="Is pending?" name="isPending" />
        </Space>
      </Form>
    </Formik>
  );
}
