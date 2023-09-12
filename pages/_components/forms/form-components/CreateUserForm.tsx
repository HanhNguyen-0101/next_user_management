import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { InputField, SwitchField } from "../form-fields";
import { useTranslation } from "next-i18next";
import { Form, Input, Space } from "antd";
import { useDispatch } from "react-redux";
import { DrawerAction } from "@/redux/actions";
import { UserAction } from "@/redux/actions/user.action";

export default function CreateUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      firstName: "",
      globalId: "",
      isDisable: false,
      isPending: false,
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
    onSubmit: async (values) => {
      await dispatch(UserAction.addItem(values));
      await dispatch(DrawerAction.hideDrawer());
    },
  });
  useEffect(() => {
    dispatch(DrawerAction.setCallbackDrawer(formik.handleSubmit));
  }, []);

  return (
    <Form
      layout="vertical"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <Space className="grid grid-cols-2">
        <Form.Item
          className="mb-1"
          label={
            <span className="font-bold">
              First Name <span className="text-red-500">*</span>
            </span>
          }
        >
          <Input
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName ? (
            <div className="text-red-500 text-xs mb-2">
              {formik.errors.firstName}
            </div>
          ) : null}
        </Form.Item>
        <Form.Item
          className="mb-1"
          label={
            <span className="font-bold">
              Last Name <span className="text-red-500">*</span>
            </span>
          }
        >
          <Input
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? (
            <div className="text-red-500 text-xs mb-2">
              {formik.errors.lastName}
            </div>
          ) : null}
        </Form.Item>
      </Space>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            Email <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <div className="text-red-500 text-xs mb-2">{formik.errors.email}</div>
        ) : null}
      </Form.Item>
      <Form.Item
        className="mb-1"
        label={
          <span className="font-bold">
            Password <span className="text-red-500">*</span>
          </span>
        }
      >
        <Input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <div className="text-red-500 text-xs mb-2">
            {formik.errors.password}
          </div>
        ) : null}
      </Form.Item>
      {/* <Space className="grid grid-cols-2">
        <InputField label="Office Code" type="text" name="officeCode" />
        <InputField label="Global ID" type="text" name="globalId" />
      </Space>
      <Space className="grid grid-cols-2">
        <SwitchField label="Is disabled?" name="isDisable" />
        <SwitchField label="Is pending?" name="isPending" />
      </Space> */}
    </Form>
  );
}
