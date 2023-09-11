import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { InputField, SwitchField } from "../form-fields";
import { useTranslation } from "next-i18next";
import { IUserModel } from "@/redux/models/user";
import { Space } from "antd";

export default function CreateUserForm({
  onCreateUserSubmit,
}: {
  onCreateUserSubmit: (payload: Partial<IUserModel>) => void;
}) {
  const { t } = useTranslation(["common", "auth"]);
  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        globalId: "",
        isDisable: false,
        isPending: false,
        lastName: "",
        officeCode: "",
        password: "",
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
        onCreateUserSubmit(values);
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
          <SwitchField label='Is disabled?' name='isDisable' />
          <SwitchField label='Is pending?' name='isPending' />
        </Space>
      </Form>
    </Formik>
  );
}
