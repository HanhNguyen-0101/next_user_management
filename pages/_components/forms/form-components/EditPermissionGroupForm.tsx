import {
  DrawerAction,
  PermissionGroupAction
} from "@/redux/actions";
import { Form } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { InputFormField } from "../form-fields";

export default function EditPermissionGroupForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { query, permissionGroup } = useSelector(
    (state) => state.permissionGroupReducer
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: permissionGroup?.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
    }),
    onSubmit: async (values) => {
      await dispatch(
        PermissionGroupAction.editItem({
          editPayload: {
            id: permissionGroup?.id,
            data: values,
          },
          query,
        })
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
