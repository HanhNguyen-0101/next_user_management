import { ModalAction, UserAction } from "@/redux/actions";
import { IRoleModel } from "@/redux/models/role";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  SelectFormField
} from "../form-fields";

export default function FilterUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { roleData } = useSelector((state) => state.roleReducer);
  const { query } = useSelector((state) => state.userReducer);
  const role = roleData?.data?.map((i: IRoleModel) => {
    return {
      value: i.id,
      label: i.name,
    };
  });

  const handleSelectChange = (name: string) => {
    return (value: boolean | string) => {
      formik.setFieldValue(name, value);
    };
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isDisable: 'all',
      isPending: 'all',
      isRegisteredWithGoogle: 'all',
      role: [],
    },
    validationSchema: Yup.object({
      isDisable: Yup.mixed(),
      isPending: Yup.mixed(),
      isRegisteredWithGoogle: Yup.mixed(),
      role: Yup.mixed(),
    }),
    onSubmit: (values) => {
      console.log("-------------", values);
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
        <h1 className="text-xl title-font font-medium text-center text-blueDark uppercase">
          Filter Form
        </h1>
      </div>
      <Space className="grid grid-cols-2 items-start">
        <SelectFormField
          formik={formik}
          label="Role"
          name="role"
          mode="multiple"
          onChange={handleSelectChange("role")}
          options={role}
        />
        <SelectFormField
          formik={formik}
          label="Is Registered With Google"
          name="isRegisteredWithGoogle"
          onChange={handleSelectChange("isRegisteredWithGoogle")}
          options={[
            {
              label: "All",
              value: 'all',
            },
            {
              label: "Registered via Google",
              value: true,
            },
            {
              label: "Registered via System",
              value: false,
            },
          ]}
        />
      </Space>
      <Space className="grid grid-cols-2 items-start">
        <SelectFormField
          formik={formik}
          label="Is Disabled"
          name="isDisable"
          onChange={handleSelectChange("isDisable")}
          options={[
            {
              label: "All",
              value: 'all',
            },
            {
              label: "Disable",
              value: true,
            },
            {
              label: "Action",
              value: false,
            },
          ]}
        />
        <SelectFormField
          formik={formik}
          label="Is Pending"
          name="isPending"
          onChange={handleSelectChange("isPending")}
          options={[
            {
              label: "All",
              value: 'all',
            },
            {
              label: "Pending",
              value: true,
            },
            {
              label: "Approve",
              value: false,
            },
          ]}
        />
      </Space>
    </Form>
  );
}
