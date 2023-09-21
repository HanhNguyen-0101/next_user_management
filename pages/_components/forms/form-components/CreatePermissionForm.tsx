import { DrawerAction, PermissionAction } from "@/redux/actions";
import { IPermissionGroupModel } from "@/redux/models/permissionGroup";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { InputFormField, SelectFormField } from "../form-fields";
import { TextAreaFormField } from "../form-fields/TextareaFormField";

export default function CreatePermissionForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.permissionReducer);
  const { permissionGroupData } = useSelector(
    (state) => state.permissionGroupReducer
  );
  const permissionGroup = permissionGroupData?.data?.map(
    (permissionGroup: IPermissionGroupModel) => {
      return {
        value: permissionGroup.id,
        label: permissionGroup.name,
      };
    }
  );

  const handleSelectChange = (name: string) => {
    return (value: string) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      code: "",
      permissionGroupId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .max(100, t("error.charactersInvalid", { number: 100 }))
        .required(t("error.required")),
      description: Yup.string()
        .trim()
        .max(300, t("error.charactersInvalid", { number: 300 })),
      code: Yup.string()
        .trim()
        .max(30, t("error.charactersInvalid", { number: 30 })),
      permissionGroupId: Yup.string().required(t("error.required")),
    }),
    onSubmit: async (values) => {
      await dispatch(PermissionAction.addItem({ addPayload: values, query }));
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
      <Space className="grid grid-cols-3 items-start">
        <InputFormField
          formik={formik}
          label="Name"
          name="name"
          isRequired={true}
        />
        <InputFormField formik={formik} label="Code" name="code" />
        <SelectFormField
          formik={formik}
          label="Permission Group"
          name="permissionGroupId"
          onChange={handleSelectChange("permissionGroupId")}
          options={permissionGroup}
        />
      </Space>
      <TextAreaFormField
        row={4}
        formik={formik}
        label="Description"
        name="description"
      />
    </Form>
  );
}
