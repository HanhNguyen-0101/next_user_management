import { DrawerAction, MenuAction } from "@/redux/actions";
import { IMenuModel } from "@/redux/models/menu";
import { Form, Space } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { InputFormField, SelectFormField } from "../form-fields";

export default function EditMenuForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { menuData, query, menu } = useSelector((state) => state.menuReducer);
  const menuArr = menuData?.data?.map((menu: IMenuModel) => {
    return {
      label: menu.name,
      value: menu.id,
    };
  });

  const handleSelectChange = (name: string) => {
    return (value: string) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: menu?.name,
      key: menu?.key,
      parentId: menu?.parentId,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .max(30, t("error.charactersInvalid", { number: 30 }))
        .required(t("error.required")),
      key: Yup.string()
        .trim()
        .max(50, t("error.charactersInvalid", { number: 50 }))
        .required(t("error.required")),
      parentId: Yup.string().required(t("error.required")),
    }),
    onSubmit: async (values) => {
      await dispatch(
        MenuAction.editItem({
          editPayload: {
            id: menu?.id,
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
      <Space className="grid grid-cols-3 items-start">
        <InputFormField
          formik={formik}
          label="Name"
          name="name"
          isRequired={true}
        />
        <InputFormField
          formik={formik}
          label="Key"
          name="key"
          isRequired={true}
        />
        <SelectFormField
          formik={formik}
          label="Parent Menu"
          name="parentId"
          onChange={handleSelectChange("parentId")}
          options={menuArr}
          required={true}
        />
      </Space>
    </Form>
  );
}
