import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { Form, Input, Space, Switch } from "antd";
import { useDispatch } from "react-redux";
import { DrawerAction } from "@/redux/actions";
import { UserAction } from "@/redux/actions/user.action";
import { InputFormField } from "../form-fields/InputFormField";
import { SwitchFormField } from "../form-fields/SwitchFormField";

export default function CreateUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      firstName: "",
      globalId: "",
      isDisable: false,
      isPending: true,
      lastName: "",
      officeCode: "",
      password: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      dispatch(UserAction.addItem(values));
    },
  });
  useEffect(() => {
    dispatch(DrawerAction.setCallbackDrawer(formik.resetForm));
    dispatch(DrawerAction.setCallbackDrawer(formik.handleSubmit));
  }, []);

  return (
    <Form
      layout="vertical"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
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
      <InputFormField
        formik={formik}
        label="Email"
        name="email"
        isRequired={true}
      />
      <InputFormField
        formik={formik}
        type={'password'}
        label="Password"
        name="password"
        isRequired={true}
      />
      <Space className="grid grid-cols-2 items-start">
        <InputFormField formik={formik} label="Office Code" name="officeCode" />
        <InputFormField formik={formik} label="Global ID" name="globalId" />
      </Space>
      <Space className="grid grid-cols-2 items-start">
        <SwitchFormField
          formik={formik}
          label="Is disabled?"
          name="isDisable"
          onChange={handleChangeSwitch("isDisable")}
        />
        <SwitchFormField
          formik={formik}
          label="Is pending?"
          name="isPending"
          onChange={handleChangeSwitch("isPending")}
        />
      </Space>
    </Form>
  );
}