import { AuthAction, ModalAction } from "@/redux/actions";
import { DeleteOutlined } from "@ant-design/icons";
import { Form, Popconfirm, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  CheckboxFormField,
  InputFormField,
  SelectFormField,
} from "../form-fields";
import { IRoleModel } from "@/redux/models/role";

export default function FilterUserForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { roleData } = useSelector((state) => state.roleReducer);
  const role = roleData?.data?.map((i: IRoleModel) => {
    return {
      value: i.id,
      label: i.name,
    }
  })

  const handleSelectChange = (name: string) => {
    return (value: boolean | string) => {
      formik.setFieldValue(name, value);
    };
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isDisable: -1,
      isPending: -1,
      isRegisteredWithGoogle: -1,
      role: [],
    },
    validationSchema: Yup.object({
      isDisable: Yup.number(),
      isPending: Yup.number(),
      isRegisteredWithGoogle: Yup.number(),
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
              value: -1,
            },
            {
              label: "Registered via Google",
              value: 1,
            },
            {
              label: "Registered via System",
              value: 0,
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
              value: -1,
            },
            {
              label: "Disable",
              value: 1,
            },
            {
              label: "Action",
              value: 0,
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
              value: -1,
            },
            {
              label: "Pending",
              value: 1,
            },
            {
              label: "Approve",
              value: 0,
            },
          ]}
        />
      </Space>
    </Form>
  );
}
