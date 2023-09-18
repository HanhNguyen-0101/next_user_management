import { DrawerAction, UserAction } from "@/redux/actions";
import { Divider, Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CheckboxFormField, InputFormField } from "../form-fields";

export default function CreateUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();

  const handleChangeCheckbox = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
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
      country: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      passwordConfirm: Yup.string()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required"))
        .oneOf([Yup.ref("password")], t("error.passwordNotMatch")),
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
      country: Yup.string().max(
        100,
        t("error.charactersInvalid", { number: 100 })
      ),
      officeCode: Yup.string().max(
        10,
        t("error.charactersInvalid", { number: 10 })
      ),
      isDisable: Yup.boolean(),
      isPending: Yup.boolean(),
    }),
    onSubmit: (values) => {
      delete values["passwordConfirm"];
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
      <InputFormField
        formik={formik}
        label="Email"
        name="email"
        isRequired={true}
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
        <InputFormField
          formik={formik}
          type={"password"}
          label="Password"
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
      </Space>
      <Divider orientation="left">More Information</Divider>
      <Space className="grid grid-cols-3 items-start">
        <InputFormField formik={formik} label="Office Code" name="officeCode" />
        <InputFormField formik={formik} label="Global ID" name="globalId" />
        <InputFormField formik={formik} label="Country" name="country" />
      </Space>
      <CheckboxFormField
        formik={formik}
        name="isDisable"
        onChange={handleChangeCheckbox}
      >
        Disabled?
      </CheckboxFormField>
      <CheckboxFormField
        formik={formik}
        name="isPending"
        onChange={handleChangeCheckbox}
      >
        Pending?
      </CheckboxFormField>
    </Form>
  );
}
