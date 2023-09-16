import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import { Divider, Form, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DrawerAction } from "@/redux/actions";
import { UserAction } from "@/redux/actions/user.action";
import {
  InputFormField,
  CheckboxFormField,
  SelectFormField,
} from "../form-fields";
import { hasPermission, permissionTypes } from "pages/_utils/checkPermission";
import { RoleAction } from "@/redux/actions/role.action";
import { IRoleModel } from "@/redux/models/role";

export default function CreateUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { profile } = useSelector((state: any) => state.authReducer);
  const { roleData } = useSelector((state: any) => state.roleReducer);

  const hasAssignRolePermission = hasPermission(
    permissionTypes.USER_ROLE_CREATE,
    profile?.permissionList
  );

  const handleChangeCheckbox = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked);
  };
  const handleChangeSelect = (name: string) => {
    return (value: Array<string>) => {
      formik.setFieldValue(name, [...value]);
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
      country: "",
      password: "",
      role: [],
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(30, t("error.charactersInvalid", { number: 30 }))
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
      role: Yup
      .array().of(Yup.string())
      .min(1, t("error.required")),
    }),
    onSubmit: (values) => {
      // dispatch(UserAction.addItem(values));
      console.log("888888888", values);
    },
  });

  useEffect(() => {
    dispatch(DrawerAction.setCallbackDrawer(formik.resetForm));
    dispatch(DrawerAction.setCallbackDrawer(formik.handleSubmit));
    dispatch(RoleAction.getAll());
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
          label="Email"
          name="email"
          isRequired={true}
        />
        <InputFormField
          formik={formik}
          type={"password"}
          label="Password"
          name="password"
          isRequired={true}
        />
      </Space>
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
      {hasAssignRolePermission && (
        <>
          <Divider orientation="left">Assign Role</Divider>
          <Space className="grid grid-cols-2 items-start">
            <SelectFormField
              formik={formik}
              name="role"
              label="Role"
              mode="multiple"
              required={true}
              options={roleData?.data.map((i: IRoleModel) => {
                return { value: i.id, label: i.name };
              })}
              onChange={handleChangeSelect('role')}
            />
          </Space>
        </>
      )}
    </Form>
  );
}
