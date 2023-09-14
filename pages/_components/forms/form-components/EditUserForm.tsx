import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { Space, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DrawerAction } from "@/redux/actions";
import { InputFormField } from "../form-fields/InputFormField";
import { SwitchFormField } from "../form-fields/SwitchFormField";
import { UserAction } from "@/redux/actions/user.action";
import { CheckboxFormField } from "../form-fields/CheckboxFormField";

export default function EditUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer);
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleCheckboxChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user.email || "",
      firstName: user.firstName || "",
      globalId: user.globalId || "",
      isDisable: user.isDisable,
      isPending: user.isPending,
      lastName: user.lastName || "",
      officeCode: user.officeCode || "",
      password: "",
      isChangePassword: false,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .ensure()
        .when("isChangePassword", {
          is: true,
          then: (schema) =>
            schema
              .max(15, t("error.charactersInvalid", { number: 15 }))
              .required(t("error.required"))
              .required(t("error.required")),
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
      isDisable: Yup.boolean(),
      isPending: Yup.boolean(),
    }),
    onSubmit: (values) => {
      if (!values.isChangePassword) {
        values.password = user.password;
      }
      delete values["isChangePassword"];
      dispatch(UserAction.editItem(user.id, values));
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
      <InputFormField
        formik={formik}
        label="Email"
        name="email"
        isRequired={true}
        disabled={true}
      />
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
        name="isDisable"
        onChange={handleCheckboxChange}
      >
        Disabled?
      </CheckboxFormField>
      <CheckboxFormField
        formik={formik}
        name="isPending"
        onChange={handleCheckboxChange}
      >
        Pending?
      </CheckboxFormField>
      <CheckboxFormField
        formik={formik}
        name="isChangePassword"
        onChange={handleCheckboxChange}
      >
        Change password?
      </CheckboxFormField>
      {formik.values.isChangePassword && (
        <InputFormField
          formik={formik}
          type="password"
          label="Password"
          name="password"
          isRequired={true}
        />
      )}
    </Form>
  );
}
