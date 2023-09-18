import { DrawerAction, UserAction } from "@/redux/actions";
import { Divider, Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { CheckboxFormField, InputFormField } from "../form-fields";

export default function EditUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { user, currentPage } = useSelector((state: any) => state.userReducer);
  const handleCheckboxChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      globalId: user?.globalId || "",
      isDisable: user?.isDisable,
      isPending: user?.isPending,
      lastName: user?.lastName || "",
      officeCode: user?.officeCode || "",
      country: user?.country || "",
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
      country: Yup.string().max(
        100,
        t("error.charactersInvalid", { number: 100 })
      ),
      isDisable: Yup.boolean(),
      isPending: Yup.boolean(),
    }),
    onSubmit: (values) => {
      if (!values.isChangePassword) {
        values.password = user?.password;
      }
      delete values["isChangePassword"];
      delete values["passwordConfirm"];
      dispatch(UserAction.editItem(user?.id, values, currentPage));
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
      <CheckboxFormField
        formik={formik}
        name="isChangePassword"
        onChange={handleCheckboxChange}
      >
        Change password?
      </CheckboxFormField>
      {formik.values.isChangePassword && (
        <Space className="grid grid-cols-2 items-start">
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
        </Space>
      )}
      <Divider orientation="left">More Information</Divider>
      <Space className="grid grid-cols-3 items-start">
        <InputFormField formik={formik} label="Office Code" name="officeCode" />
        <InputFormField formik={formik} label="Global ID" name="globalId" />
        <InputFormField formik={formik} label="Country" name="country" />
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
    </Form>
  );
}
