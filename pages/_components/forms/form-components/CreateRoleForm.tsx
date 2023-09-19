import { DrawerAction, RoleAction, UserAction } from "@/redux/actions";
import { Divider, Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CheckboxFormField, InputFormField } from "../form-fields";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { useSelector } from "react-redux";
import { TextAreaFormField } from "../form-fields/TextareaFormField";

export default function CreateRoleForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.roleReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      description: Yup.string()
        .trim()
        .max(300, t("error.charactersInvalid", { number: 300 })),
    }),
    onSubmit: async (values) => {
      await dispatch(RoleAction.addItem({ addPayload: values, query }));
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
      <TextAreaFormField
        row={4}
        formik={formik}
        label="Description"
        name="description"
      />
    </Form>
  );
}
