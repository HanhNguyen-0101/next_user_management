import {
  DrawerAction,
  PermissionAction,
  PermissionGroupAction,
} from "@/redux/actions";
import { IPermissionGroupModel } from "@/redux/models/permissionGroup";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { InputFormField, SelectFormField } from "../form-fields";
import { TextAreaFormField } from "../form-fields/TextareaFormField";

export default function CreatePermissionGroupForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.permissionGroupReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
    }),
    onSubmit: async (values) => {
      await dispatch(
        PermissionGroupAction.addItem({ addPayload: values, query })
      );
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
        label="Name"
        name="name"
        isRequired={true}
      />
    </Form>
  );
}
